"""Deterministic public ZIP; never package downloaded clients or private assets."""
import base64
import hashlib
import json
from pathlib import Path
import sys
import zipfile

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/automation/out'
PREFIX = 'Speaki_rpg_mine_patch'

def package(candidate):
    extension = candidate / 'public/extension'
    original = ROOT / 'public/extension'
    manifest = json.loads((extension / 'manifest.json').read_text('utf8'))
    files = {p.relative_to(extension).as_posix(): p.read_bytes() for p in extension.rglob('*') if p.is_file()}
    expected = {p.relative_to(original).as_posix() for p in original.rglob('*') if p.is_file() and '_metadata' not in p.relative_to(original).parts}
    assert set(files) == expected and len(files) == 21
    allowed_changes = {'manifest.json', 'main.js', 'README.txt', 'client/loader.mjs', 'rules.json'}
    for name, data in files.items():
        if name not in allowed_changes:
            assert data == (original / name).read_bytes(), name
    old = json.loads((original / 'manifest.json').read_text('utf8'))
    assert {**old, 'version': manifest['version']} == manifest
    for name, token in [('main.js', 'version:"{}"'), ('README.txt', ' {} ')]:
        assert files[name] == (original / name).read_bytes().replace(token.format(old['version']).encode(), token.format(manifest['version']).encode(), 1)
    resources = files['resources.js'].decode('utf8')
    resources = json.loads(resources[resources.index('{'):resources.rindex('}') + 1])
    icon = base64.b64decode(resources['waterItemIcon'].removeprefix('data:image/png;base64,'))
    assert icon == (ROOT / 'public/src/water-tub-16.png').read_bytes() and len(icon) == 249
    assert resources['css'] == (ROOT / 'public/src/mining.css').read_text('utf8')
    assert 'render-distance.js' not in files
    version = manifest['version']
    target = candidate / f'releases/{PREFIX}-{version}.zip'
    target.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for name, data in sorted(files.items()):
            info = zipfile.ZipInfo(PREFIX + '/' + name, (2026, 1, 1, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, data)
    with zipfile.ZipFile(target) as archive:
        assert archive.testzip() is None
        assert all(archive.read(PREFIX + '/' + name) == data for name, data in files.items())
    state = {'version': version, 'asset': target.name, 'sha256': hashlib.sha256(target.read_bytes()).hexdigest(), 'bytes': target.stat().st_size}
    (candidate / 'public/automation/release-state.json').write_text(json.dumps(state, indent=2) + '\n', encoding='utf8')
    return state

if __name__ == '__main__':
    report = json.loads((OUT / 'report.json').read_text('utf8'))
    assert report['status'] == 'candidate'
    assert (OUT / 'validation.json').exists(), 'Regression tests must finish first'
    state = package(OUT / 'candidate')
    report['package'] = state
    report['validated'] = True
    report['files'] = {p.relative_to(OUT / 'candidate').as_posix(): hashlib.sha256(p.read_bytes()).hexdigest() for p in (OUT / 'candidate').rglob('*') if p.is_file()}
    (OUT / 'report.json').write_text(json.dumps(report, indent=2) + '\n', encoding='utf8')
    print(json.dumps(state))
