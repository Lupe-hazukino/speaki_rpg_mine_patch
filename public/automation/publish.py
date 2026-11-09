"""Publish a validated candidate or report a review. Existing releases are immutable."""
import base64
import hashlib
import io
import json
import os
from pathlib import Path
import re
import urllib.parse
import zipfile
from github import GitHub, REPO

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'public/automation/out'
MARKER = '<!-- speaki-compatibility:'

def sha(data):
    return hashlib.sha256(data).hexdigest()

def expected_readme(text, old, new):
    filename = f'Speaki_rpg_mine_patch-{old}.zip'
    link = f'https://github.com/{REPO}/releases/tag/v{old}'
    assert text.count(filename) == text.count(link) == 1
    return text.replace(filename, f'Speaki_rpg_mine_patch-{new}.zip').replace(link, f'https://github.com/{REPO}/releases/tag/v{new}')

def verify_candidate(root, candidate, report):
    assert report['status'] == 'candidate' and report.get('validated') is True
    baseline = json.loads((root / 'public/automation/baseline.json').read_text('utf8'))
    old, new = baseline['reviewedVersion'], report['version']
    assert report['baseHash'] == baseline['entrySHA256'] and report['baseVersion'] == old
    major, minor, patch = map(int, old.split('.'))
    assert new == f'{major}.{minor}.{patch + 1}'
    names = {p.relative_to(candidate).as_posix() for p in candidate.rglob('*') if p.is_file()}
    extension_names = {p.relative_to(root).as_posix() for p in (root / 'public/extension').rglob('*') if p.is_file() and '_metadata' not in p.relative_to(root / 'public/extension').parts}
    asset_path = f'releases/Speaki_rpg_mine_patch-{new}.zip'
    assert names == extension_names | {'README.md', 'public/automation/baseline.json', 'public/automation/release-state.json', asset_path}
    assert set(report['files']) == names
    files = {name: (candidate / name).read_bytes() for name in names}
    for name, data in files.items():
        assert sha(data) == report['files'][name]
    next_base = json.loads(files['public/automation/baseline.json'])
    assert next_base['schema'] == 1 and next_base['reviewedVersion'] == new
    assert next_base['normalizedSHA256'] == baseline['normalizedSHA256'] and next_base['assets'] == baseline['assets']
    assert next_base['entrySHA256'] == report['entryHash'] and next_base['entryURL'] == report['entryURL']
    assert re.fullmatch(r'https://speakirpg\.overture\.io\.kr/assets/index-[\w-]+\.js', next_base['entryURL'])
    manifest = json.loads(files['public/extension/manifest.json'])
    old_manifest = json.loads((root / 'public/extension/manifest.json').read_text('utf8'))
    assert manifest == {**old_manifest, 'version': new}
    assert files['README.md'].decode('utf8') == expected_readme((root / 'README.md').read_text('utf8'), old, new)
    for name, token in [('main.js', 'version:"{}"'), ('README.txt', ' {} ')]:
        previous = (root / 'public/extension' / name).read_bytes()
        assert previous.count(token.format(old).encode()) == 1
        assert files['public/extension/' + name] == previous.replace(token.format(old).encode(), token.format(new).encode(), 1)
    allowed = {'manifest.json', 'main.js', 'README.txt', 'client/loader.mjs', 'rules.json'}
    for name in extension_names:
        if name.removeprefix('public/extension/') not in allowed:
            assert files[name] == (root / name).read_bytes(), name
    old_rules = json.loads((root / 'public/extension/rules.json').read_text('utf8'))
    rules = json.loads(files['public/extension/rules.json'])
    if not any(r['condition']['urlFilter'] == '|' + next_base['entryURL'] + '|' for r in old_rules):
        old_rules.insert(0, {**old_rules[0], 'condition': {**old_rules[0]['condition'], 'urlFilter': '|' + next_base['entryURL'] + '|'}})
    assert rules == [{**rule, 'id': i+1} for i, rule in enumerate(old_rules)]
    state = json.loads(files['public/automation/release-state.json'])
    assert state == report['package'] and state['version'] == new
    assert state['asset'] == asset_path.split('/')[-1]
    payload = files[asset_path]
    assert state['sha256'] == sha(payload) and state['bytes'] == len(payload)
    with zipfile.ZipFile(io.BytesIO(payload)) as archive:
        assert archive.testzip() is None
        assert set(archive.namelist()) == {'Speaki_rpg_mine_patch/' + p.removeprefix('public/extension/') for p in extension_names}
        assert len(archive.namelist()) == 21
        for name in extension_names:
            assert archive.read('Speaki_rpg_mine_patch/' + name.removeprefix('public/extension/')) == files[name]
    # Commit only changed files; no workflow, test or private file can come from an artifact.
    return {name: data for name, data in files.items() if not (root / name).exists() or (root / name).read_bytes() != data}, state, payload

def publish_release(api, state, payload, commit):
    version, asset_name = state['version'], state['asset']
    assert re.fullmatch(r'\d+\.\d+\.\d+', version)
    assert asset_name == f'Speaki_rpg_mine_patch-{version}.zip'
    assert sha(payload) == state['sha256'] and len(payload) == state['bytes']
    release = api.request('GET', '/releases/tags/v' + version)
    if release is None:
        release = api.request('POST', '/releases', {'tag_name': 'v'+version, 'target_commitish': commit,
            'name': 'Speaki_rpg_mine_patch '+version, 'body': '', 'draft': True, 'prerelease': False, 'generate_release_notes': False})
    asset = next((a for a in release.get('assets', []) if a['name'] == asset_name), None)
    if asset:
        assert asset['size'] == len(payload) and asset.get('digest') == 'sha256:'+state['sha256'], 'Existing release asset differs; manual review required'
    else:
        assert release['draft'], 'Never alter a published release'
        asset = api.request('POST', release['upload_url'].split('{')[0]+'?name='+urllib.parse.quote(asset_name), payload, binary=True)
        assert asset['state'] == 'uploaded' and asset['size'] == len(payload) and asset.get('digest') == 'sha256:'+state['sha256']
    if release['draft']:
        # Preserve the user's description and title, even when recovering a partial upload.
        release = api.request('PATCH', '/releases/'+str(release['id']), {'draft': False, 'prerelease': False, 'make_latest': 'true'})
    assert not release['draft'] and not release['prerelease']
    return release['html_url']

def report_review(api, report):
    key = report.get('reviewKey') or sha((report.get('entryURL','')+'\n'+report.get('entryHash','')+'\n'+report.get('reason','')).encode())[:20]
    marker = MARKER+key+' -->'
    if any(marker in (i.get('body') or '') for i in api.issues()):
        print('Review already recorded: '+key)
        return
    run = f'https://github.com/{REPO}/actions/runs/{os.environ.get("GITHUB_RUN_ID", "")}'
    error = report.get('status') == 'error'
    result = '自動検証に失敗しました。' if error else 'ゲーム側の変更を検知しましたが、鉱山MODの互換性を自動確認できませんでした。'
    body = marker+'\n\n'+result+' 自動公開を停止し、現在の配布版を維持しています。'
    body += '\n\n鉱山に対する修正が必要か、以下の検出内容を確認してください。現時点では鉱山の不具合が確定したという意味ではありません。'
    body += '\n\n- 配布版: '+str(report.get('baseVersion') or '取得できませんでした')
    body += '\n- 検証日時（UTC）: '+str(report.get('checkedAt') or '実行ログを参照')
    body += '\n- 判定: '+('検証失敗・対応要否の確認が必要' if error else '互換性未確認・対応要否の確認が必要')
    if 'structureChanged' in report:
        body += '\n- メイン処理の構造変更: '+('あり' if report['structureChanged'] else 'なし')
    body += '\n\n検出理由: '+report.get('reason','自動検証が完了しませんでした。')
    dependencies = report.get('changedDependencies', [])
    if dependencies:
        body += '\n\n変更された依存ファイル:\n\n'+'\n'.join('- '+url for url in dependencies)
    body += '\n\n対象: '+(report.get('entryURL') or '取得できませんでした')+'\n\n[検証ログ]('+run+')'
    cache = {'entryURL': report.get('entryURL'), 'entryHash': report.get('entryHash'), 'reviewKey': key}
    body += '\n\n<!-- speaki-observation:'+json.dumps(cache,separators=(',',':'))+' -->'
    api.request('POST', '/issues', {'title': '[鉱山MOD] 対応要否の確認が必要 '+key, 'body': body,
                                  'assignees': ['Lupe-hazukino']})

def main():
    assert os.environ.get('GITHUB_REF') == 'refs/heads/main'
    api = GitHub()
    report = json.loads((OUT / 'report.json').read_text('utf8'))
    if os.environ.get('PUBLISH_ENABLED') != 'true':
        print('Dry run: '+report['status']+'; no GitHub mutations')
        return
    if report['status'] in {'review','error'}:
        report_review(api, report)
        return
    expected = os.environ['GITHUB_SHA']
    assert re.fullmatch(r'[0-9a-f]{40}', expected)
    head = api.request('GET', '/git/ref/heads/main')['object']['sha']
    assert head == expected, 'main changed during validation; retry against the new commit'
    if report['status'] == 'candidate':
        changes, state, payload = verify_candidate(ROOT, OUT / 'candidate', report)
        assert api.request('GET', '/releases/tags/v'+state['version']) is None, 'Version already exists; refusing overwrite'
        assert api.request('GET', '/git/ref/tags/v'+state['version']) is None, 'Tag already exists; refusing overwrite'
        tree = api.request('GET', '/git/commits/'+head)['tree']['sha']
        elements = []
        for name, data in sorted(changes.items()):
            blob = api.request('POST', '/git/blobs', {'encoding':'base64','content':base64.b64encode(data).decode()})
            elements.append({'path': name, 'mode':'100644','type':'blob','sha':blob['sha']})
        tree = api.request('POST','/git/trees',{'base_tree':tree,'tree':elements})['sha']
        commit = api.request('POST','/git/commits',{'message':'Update compatibility to '+state['version'],'tree':tree,'parents':[head]})['sha']
        # A concurrent commit makes this non-fast-forward and GitHub rejects it.
        api.request('PATCH','/git/refs/heads/main',{'sha':commit,'force':False})
    else:
        assert report['status']=='unchanged'
        commit = head
        state = json.loads((ROOT / 'public/automation/release-state.json').read_text('utf8'))
        assert state['version'] == json.loads((ROOT / 'public/automation/baseline.json').read_text('utf8'))['reviewedVersion']
        payload = (ROOT / 'releases' / state['asset']).read_bytes()
    print(publish_release(api, state, payload, commit))

if __name__ == '__main__':
    main()
