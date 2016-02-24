import pkg from '../package.json';
import simpleGit from 'simple-git';

const deployDir = './deploy';

const git = simpleGit(deployDir);
git.add('./*').commit(`Site Generated: v${pkg.version}, ${new Date().toLocaleString()}`);
git.push('origin', 'master');
