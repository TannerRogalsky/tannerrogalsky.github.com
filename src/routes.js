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
  '2016-09-30-love.js-post-mortem',
  '2016-10-30-reflections-on-demoloops',
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
  'loop019',
  'loop020',
  'loop021',
  'loop022',
  'loop023',
  'loop024',
  'loop025',
  'loop026',
  'loop027',
  'loop028',
  'loop029',
  'loop030',
  'loop031',
  'loop032',
  'loop033',
  'loop034',
  'loop035',
  'loop036',
  'loop037',
  'loop038',
  'loop039',
  'loop040',
  'loop041',
  'loop042',
  'loop043',
  'loop044',
  'loop045',
  'loop046',
  'loop047',
  'loop048',
  'loop049',
  'loop050',
  'loop051',
  'loop052',
  'loop053',
  'loop054',
  'loop055',
  'loop056',
  'loop057',
  'loop058',
  'loop059',
  'loop060',
  'loop061',
  'loop062',
  'loop064',
  'loop065',
  'loop066',
  'loop067',
  'loop068',
  'loop069',
  'loop070',
  'loop071',
];

const newLoops = [
  '072',
  // '073',
  '074',
  '075',
  '076',
  '077',
  '078',
  '079',
  '080',
  '081',
  '082',
  '085',
  '086',
  '087',
  '088',
  // '089',
  '090',
  // '091',
];

const specialLoops = [
  'sailor_moon',
  'sendy',
  'valentines',
  'pilotpriest_lost_boy',
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
    props: { entryNames: loops, newEntryNames: newLoops },
  };
};

const routes = {
  '/'() { return { element: require('./components/Root.js').default, props: {} }; },
  '/about'() { return { element: require('./components/About.js').default, props: {} }; },
  '/blog/': BlogIndex,
  '/blog/archives/': BlogIndex,
  '/demoloops/': DemoloopsIndex,
  '/demoloops/hope'() { return { element: require('./components/demoloops/Hope.js').default, props: {} }; },
  '/demoloops/about'() { return { element: require('./components/demoloops/About.js').default, props: {} }; },
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
      props: { prev: loops[i - 1], name: loop, next: loops[i + 1] || newLoops[0] },
    };
  };
  routes[`/demoloops/${loop}`] = getLoopData;
}

for (let i = 0; i < newLoops.length; i++) {
  const loop = newLoops[i];
  const getLoopData = function getLoopData() { // eslint-disable-line no-loop-func
    return {
      element: require('./components/demoloops/ShowNew.js').default,
      props: { prev: newLoops[i - 1] || loops[loops.length - 1], name: loop, next: newLoops[i + 1] },
    };
  };
  routes[`/demoloops/loop${loop}`] = getLoopData;
}

for (let i = 0; i < specialLoops.length; i++) {
  const loop = specialLoops[i];
  const getLoopData = function getLoopData() { // eslint-disable-line no-loop-func
    return {
      element: require('./components/demoloops/Show.js').default,
      props: { name: loop },
    };
  };
  routes[`/demoloops/${loop}`] = getLoopData;
}

export default routes;
