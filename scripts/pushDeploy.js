import simpleGit from 'simple-git';

const deployDir = './deploy';

const git = simpleGit(deployDir);
git.push('origin', 'master');
