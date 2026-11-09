import importlib.util
import json
from pathlib import Path
import sys
import unittest

DIRECTORY = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(DIRECTORY))
spec = importlib.util.spec_from_file_location('publisher', DIRECTORY / 'publish.py')
publisher = importlib.util.module_from_spec(spec)
spec.loader.exec_module(publisher)

class MockAPI:
    def __init__(self, release=None, wrong_digest=False, issues=None):
        self.release = release
        self.wrong_digest = wrong_digest
        self.calls = []
        self.existing_issues = issues or []
    def issues(self):
        return self.existing_issues
    def request(self, method, endpoint, data=None, binary=False):
        self.calls.append((method, endpoint, data))
        if method == 'GET':
            return self.release
        if endpoint == '/issues':
            self.existing_issues.append(data)
            return data
        if endpoint == '/releases':
            self.release = {**data, 'id': 1, 'assets': [], 'upload_url': 'https://uploads.github.com/mock{?name}', 'html_url':'https://github.com/mock/release'}
            return self.release
        if binary:
            asset = {'name':'Speaki_rpg_mine_patch-1.2.3.zip','state':'uploaded','size':len(data),'digest':'sha256:' + ('bad' if self.wrong_digest else publisher.sha(data))}
            self.release['assets'].append(asset)
            return asset
        self.release.update(data)
        return self.release

class PublisherTests(unittest.TestCase):
    payload = b'validated zip bytes'
    @property
    def state(self):
        return {'version':'1.2.3','asset':'Speaki_rpg_mine_patch-1.2.3.zip','sha256':publisher.sha(self.payload),'bytes':len(self.payload)}

    def test_create_draft_upload_verify_publish(self):
        api = MockAPI()
        publisher.publish_release(api, self.state, self.payload, 'a'*40)
        self.assertEqual([x[0] for x in api.calls], ['GET','POST','POST','PATCH'])
        self.assertEqual(api.calls[1][2]['body'], '')
        self.assertTrue(api.calls[1][2]['draft'])
        self.assertFalse(api.release['draft'])

    def test_upload_digest_mismatch_never_publishes(self):
        api = MockAPI(wrong_digest=True)
        with self.assertRaises(AssertionError):
            publisher.publish_release(api, self.state, self.payload, 'a'*40)
        self.assertTrue(api.release['draft'])
        self.assertFalse(any(method=='PATCH' for method,_,_ in api.calls))

    def test_existing_release_not_modified_and_body_preserved(self):
        api = MockAPI()
        publisher.publish_release(api, self.state, self.payload, 'a'*40)
        api.release['body'] = 'User description'
        api.calls.clear()
        publisher.publish_release(api, self.state, self.payload, 'a'*40)
        self.assertEqual([method for method,_,_ in api.calls], ['GET'])
        self.assertEqual(api.release['body'], 'User description')

    def test_existing_different_asset_refused(self):
        api = MockAPI()
        publisher.publish_release(api, self.state, self.payload, 'a'*40)
        api.release['assets'][0]['digest'] = 'sha256:other'
        api.calls.clear()
        with self.assertRaises(AssertionError):
            publisher.publish_release(api, self.state, self.payload, 'a'*40)
        self.assertEqual(len(api.calls), 1)

    def test_retry_partial_release_preserves_user_title_and_description(self):
        api = MockAPI()
        publisher.publish_release(api, self.state, self.payload, 'a'*40)
        api.release.update(draft=True, name='User title', body='User description')
        api.calls.clear()
        publisher.publish_release(api, self.state, self.payload, 'a'*40)
        self.assertEqual([method for method,_,_ in api.calls], ['GET','PATCH'])
        self.assertEqual(api.release['body'], 'User description')
        self.assertEqual(api.release['name'], 'User title')

    def test_issue_deduplication_including_closed(self):
        api = MockAPI()
        report = {'entryURL':'https://speakirpg.overture.io.kr/assets/index-new.js','entryHash':'b'*64,'reason':'Structure changed'}
        publisher.report_review(api, report)
        api.existing_issues[0]['state'] = 'closed'
        publisher.report_review(api, report)
        self.assertEqual(len(api.existing_issues), 1)
        self.assertNotIn('@', api.existing_issues[0]['body'])

    def test_readme_scope(self):
        source = 'User 1.2.2 text\nhttps://github.com/'+publisher.REPO+'/releases/tag/v1.2.2\nSpeaki_rpg_mine_patch-1.2.2.zip'
        changed = publisher.expected_readme(source,'1.2.2','1.2.3')
        self.assertTrue(changed.startswith('User 1.2.2 text'))
        with self.assertRaises(AssertionError):
            publisher.expected_readme(source + '\nSpeaki_rpg_mine_patch-1.2.2.zip','1.2.2','1.2.3')

    def test_review_reports_evidence_and_assigns_owner_without_claiming_a_bug(self):
        api = MockAPI()
        report = {'status':'review', 'baseVersion':'1.2.2', 'checkedAt':'2026-11-09T12:00:00Z',
                  'entryURL':'https://speakirpg.overture.io.kr/assets/index-new.js',
                  'entryHash':'b'*64, 'reason':'Structure changed', 'structureChanged':True,
                  'changedDependencies':['https://speakirpg.overture.io.kr/assets/mine-new.js']}
        publisher.report_review(api, report)
        issue = api.existing_issues[0]
        self.assertEqual(issue['assignees'], ['Lupe-hazukino'])
        self.assertTrue(issue['title'].startswith('[鉱山MOD] 対応要否の確認が必要 '))
        for text in ['配布版: 1.2.2', report['checkedAt'], report['entryURL'], report['reason'],
                     report['changedDependencies'][0], 'メイン処理の構造変更: あり',
                     '鉱山の不具合が確定したという意味ではありません', '[検証ログ]']:
            self.assertIn(text, issue['body'])

    def test_check_failure_reports_unknowns_without_claiming_game_changed(self):
        api = MockAPI()
        publisher.report_review(api, {'status':'error', 'reason':'Download timed out'})
        body = api.existing_issues[0]['body']
        self.assertIn('自動検証に失敗しました', body)
        self.assertIn('配布版: 取得できませんでした', body)
        self.assertIn('Download timed out', body)
        self.assertNotIn('ゲーム側の変更を検知しました', body)
        self.assertNotIn('メイン処理の構造変更', body)

if __name__ == '__main__':
    unittest.main()
