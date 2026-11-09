"""Turn any failed test into a review report; never publish a half-validated candidate."""
import json
import os
from pathlib import Path
out = Path(__file__).resolve().parent / 'out'
out.mkdir(exist_ok=True)
file = out / 'report.json'
report = json.loads(file.read_text('utf8')) if file.exists() else {'schema':1}
if os.environ.get('CHECK_OUTCOME') != 'success':
    report.update(status='error', reason=report.get('reason') or '自動検証が失敗しました。実行ログを確認してください。', validated=False)
file.write_text(json.dumps(report, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
