import blogFileToRoute from './utils/blog_file_to_route';

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
  '2016-07-28-javascript-state-machines',
];

const loops = [
  'loop001',
  'loop002',
  'loop003',
  'loop004',
  'loop005',
  'loop006',
  'loop007',
  'loop008',
  'loop009',
  'loop010',
  'loop011',
  'loop012',
  'loop013',
  'loop014',
  'loop015',
  'loop016',
  'loop017',
  'loop018',
];

const BlogIndex = function BlogIndex() {
  return {
    element: require('./components/blog/Index.js').default,
    props: { entryNames: blogEntries },
  };
};

const DemoloopsIndex = function DemoloopsIndex() {
  return {
    element: require('./components/demoloops/Index.js').default,
    props: { entryNames: loops },
  };
};

const routes = {
  '/'() { return { element: require('./components/Root.js').default, props: {} }; },
  '/about'() { return { element: require('./components/About.js').default, props: {} }; },
  '/blog/': BlogIndex,
  '/blog/archives/': BlogIndex,
  '/demoloops/': DemoloopsIndex,
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

for (let i = 0; i < loops.length; i++) {
  const loop = loops[i];
  const getLoopData = function getLoopData() { // eslint-disable-line no-loop-func
    return {
      element: require('./components/demoloops/Show.js').default,
      props: { name: loop, next: loops[i + 1] },
    };
  };
  routes[`/demoloops/${loop}`] = getLoopData;
}

export default routes;
