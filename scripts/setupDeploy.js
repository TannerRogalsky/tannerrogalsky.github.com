import fs from 'fs-extra';
import simpleGit from 'simple-git';
import sitemap from './generateSitemap.js';
import pkg from '../package.json';

const deployDir = './deploy';
const buildDir = './dist';
const includeDir = './include';

fs.access(deployDir, fs.F_OK, function(err) {
  if (err) {
    console.log(err);
  } else {
    fs.removeSync(`${deployDir}/*`);
    fs.copySync(buildDir, deployDir);
    fs.copySync(includeDir, deployDir);
    fs.writeFileSync(`${deployDir}/sitemap.xml`, sitemap.toString());

    const git = simpleGit(deployDir);
    git.add('./*').commit(`Site Generated: v${pkg.version}, ${new Date().toLocaleString()}`);
  }
})
