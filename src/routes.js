import blogFileToRoute from './utils/blog_file_to_route';

import Root from './components/Root.js';
import Hello from './components/Hello.js';
import World from './components/World.js';

import BlogIndex from './components/blog/Index.js';
import BlogEntry from './components/blog/Show.js';

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
  '/hello.html'() { return { element: Hello, props: {} }; },
  '/world.html'() { return { element: World, props: {} }; },
  '/blog/'() { return { element: BlogIndex, props: { entryNames: blogEntries } }; },
};

const getBlogEntryData = function getBlogEntryData(blogEntry) {
  return {
    element: BlogEntry,
    props: require(`./data/blog/${blogEntry}.js`).default,
  };
};

for (const blogEntry of blogEntries) {
  routes[blogFileToRoute(blogEntry)] = getBlogEntryData(blogEntry);
}

export default routes;
