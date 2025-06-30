const core = require('@actions/core');
const github = require('@actions/github');

async function getAllFiles(octokit, owner, repo, path) {
  const { data: items } = await octokit.rest.repos.getContent({
    owner,
    repo,
    path
  });

  let files = [];

  for (const item of items) {
    if (item.type === 'file') {
      files.push(item.path);
    } else if (item.type === 'dir') {
      const subFiles = await getAllFiles(octokit, owner, repo, item.path);
      files = files.concat(subFiles);
    }
  }

  return files;
}

(async () => {
  try {
    const { context } = github;
    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);
    let prevCount = parseInt(process.env.FILESTOSTRYKE_COUNT, 10);
    const sourcePath = process.env.SOURCE_PATH || 'src/app';
    
    const allFiles = await getAllFiles(octokit, context.repo.owner, context.repo.repo, sourcePath);
    const allFilesWithTests = allFiles
        .filter(filename => filename.endsWith('.spec.ts'))
        .map(testFile => testFile.replace('.spec.ts', '.ts'));
    console.log(`Found ${allFilesWithTests.length} files with tests.`);

    if (allFilesWithTests.length === 0) {
        console.log('No test files found');
        core.setOutput('files-to-stryke', '');
        core.setOutput('files-count', 0);
    } else if (allFilesWithTests.length > prevCount) {
        const filesToStryke = allFilesWithTests.slice(0, prevCount+1);
        const newCount = prevCount+1;
        
        core.setOutput('files-to-stryke', filesToStryke.join(','));
        core.setOutput('files-count', newCount);
    } else {
        const finalCount = allFilesWithTests.length;
        
        core.setOutput('files-to-stryke', allFilesWithTests.join(','));
        core.setOutput('files-count', finalCount);
    }

  } catch (error) {
    core.setFailed(error.message);
  }
})();
