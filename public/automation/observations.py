"""Read previously reported updates so unchanged blocked builds aren't downloaded hourly."""
import json
import re
from pathlib import Path
from github import GitHub
out = Path(__file__).resolve().parent / 'out'
out.mkdir(exist_ok=True)
observations = []
for issue in GitHub().issues():
    body = issue.get('body') or ''
    for match in re.finditer(r'<!-- speaki-observation:(\{[^\n]+\}) -->', body):
        try:
            value = json.loads(match[1])
            if value.get('entryURL') and value.get('reviewKey'):
                observations.append(value)
        except ValueError:
            pass
(out / 'observations.json').write_text(json.dumps(observations), encoding='utf8')
