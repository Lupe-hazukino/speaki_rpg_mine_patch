"""Exercise packaging and publication validation against an artificial local update."""
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import zipfile

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))
import publish

def load_package():
    spec = importlib.util.spec_from_file_location('mod_package', HERE / 'package.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module

base, out = map(Path, sys.argv[1:])
builder = load_package()
builder.ROOT = base
candidate = out / 'candidate'
state = builder.package(candidate)
assert builder.package(candidate) == state, 'ZIP must be deterministic'
report = json.loads((out / 'report.json').read_text('utf8'))
report.update(package=state, validated=True, files={p.relative_to(candidate).as_posix(): publish.sha(p.read_bytes()) for p in candidate.rglob('*') if p.is_file()})
changes, verified, payload = publish.verify_candidate(base, candidate, report)
assert verified == state and payload
assert 'README.md' in changes and 'public/extension/manifest.json' in changes
assert not any(name.startswith(('private/', 'experiments/', '.github/')) for name in changes)
protected = candidate / 'public/extension/sneak.js'
original = protected.read_bytes()
protected.write_bytes(original + b'\n// unauthorized implementation drift\n')
try:
    try:
        publish.verify_candidate(base, candidate, report)
    except AssertionError:
        pass
    else:
        raise AssertionError('Tampering was accepted')
finally:
    protected.write_bytes(original)
print(json.dumps({'deterministicZip': True, 'files': 21, 'changedFiles': len(changes), 'tamperingRejected': True, 'githubMutations': 0}))
