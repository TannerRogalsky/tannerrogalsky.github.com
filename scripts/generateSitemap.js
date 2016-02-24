import sitemap from 'sitemap';

import routes from '../src/routes.js';
import fs from 'fs';

const walkSync = function walkSync(dir, filelist = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    if (fs.statSync(dir + file).isDirectory()) {
      walkSync(`${dir + file}/`, filelist);
    } else if (file.endsWith('.html')) {
      filelist.push(dir + file);
    }
  });
  return filelist;
};

const filelist = walkSync('include/').map((url) => url.replace('include/', '').replace('index.html', ''));

const sm = sitemap.createSitemap({
  hostname: 'http://tannerrogalsky.com',
  cacheTime: 600000,  // 600 sec cache period
  urls: Object.keys(routes).concat(filelist).map((url) => (
    {
      url,
      lastmodISO: new Date().toISOString(),
    }
  )),
});

export default sm;
