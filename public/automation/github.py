"""Small GitHub client. Authentication is available only in the publication job."""
import json
import os
import urllib.error
import urllib.parse
import urllib.request

REPO = 'Lupe-hazukino/speaki_rpg_mine_patch'
BASE = 'https://api.github.com/repos/' + REPO

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        raise RuntimeError('Unexpected GitHub API redirect')

class GitHub:
    def __init__(self):
        assert os.environ.get('GITHUB_REPOSITORY', REPO) == REPO
        self.token = os.environ['GH_TOKEN']
        self.opener = urllib.request.build_opener(NoRedirect)

    def request(self, method, endpoint, data=None, binary=False):
        url = endpoint if endpoint.startswith('https://') else BASE + endpoint
        assert urllib.parse.urlsplit(url).hostname in {'api.github.com', 'uploads.github.com'}
        headers = {'Authorization': 'Bearer ' + self.token, 'Accept': 'application/vnd.github+json',
                   'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'Speaki-mod-compatibility',
                   'Content-Type': 'application/zip' if binary else 'application/json'}
        body = data if binary else json.dumps(data).encode() if data is not None else None
        try:
            with self.opener.open(urllib.request.Request(url, data=body, method=method, headers=headers), timeout=60) as response:
                return json.load(response)
        except urllib.error.HTTPError as error:
            if error.code == 404 and method == 'GET':
                return None
            raise

    def issues(self):
        result = []
        for page in range(1, 11):
            batch = self.request('GET', f'/issues?state=all&per_page=100&page={page}') or []
            result.extend(item for item in batch if 'pull_request' not in item)
            if len(batch) < 100:
                return result
        raise RuntimeError('Issue history too large for safe deduplication')
