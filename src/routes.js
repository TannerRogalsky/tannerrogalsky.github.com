import blogFileToRoute from './utils/blog_file_to_route';

import Root from './components/Root.js';
import About from './components/About.js';
import BlogIndex from './components/blog/Index.js';

const blogEntries = [
  '2011-08-06-preamble',
  '2011-08-14-idiomatic-ruby',
  '2011-08-22-rasta-js',
  '2011-08-28-wtfjs',
  '2011-11-09-n-level-generator',
  '2012-04-03-molyjam-2012',
  '2012-04-06-control-maps-in-love2d',
  '2012-05-15-tojam-2012-gridphreak',
  '2012-09-19-favourite-lua-libraries',
  '2012-11-20-colors-and-metatables',
  '2013-02-11-electric-boobaloo',
  '2013-05-06-where-house',
  '2013-07-15-stop-searching-through-lua-tables',
  '2014-01-28-sportball',
  '2014-05-07-friendshape',
];

const routes = {
  '/'() { return { element: Root, props: {} }; },
  '/about'() { return { element: About, props: {} }; },
  '/blog/'() { return { element: BlogIndex, props: { entryNames: blogEntries } }; },
  '/blog/archives/'() { return { element: BlogIndex, props: { entryNames: blogEntries } }; }, // backward-compat
};

for (const blogEntry of blogEntries) {
  const getBlogEntryData = function getBlogEntryData() { // eslint-disable-line no-loop-func
    return {
      element: require('./components/blog/Show.js').default,
      props: require(`./data/blog/${blogEntry}.js`).default,
    };
  };
  routes[blogFileToRoute(blogEntry)] = getBlogEntryData;
}

export default routes;