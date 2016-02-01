import sitemap from 'sitemap';

import routes from '../src/routes.js';

const sm = sitemap.createSitemap({
  hostname: 'http://tannerrogalsky.com',
  cacheTime: 600000,  // 600 sec cache period
  urls: Object.keys(routes).map((url) => (
    {
      url,
      lastmodISO: new Date().toISOString(),
    }
  )),
});

export default sm;
