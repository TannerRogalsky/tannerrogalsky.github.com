import React from 'react';
import blogFileToRoute from '../../utils/blog_file_to_route';
import HtmlLayout from '../HtmlLayout.js';

const entryNames = [
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

const Index = function Index() {
  const entries = entryNames.map(function(entryName) {
    const entryData = require(`../../data/blog/${entryName}.js`).default;
    entryData.date = Date.parse(entryData.date);
    entryData.route = blogFileToRoute(entryName);
    return entryData;
  }).sort(function(a, b) {
    return b.date - a.date;
  });

  return (
    <div>
      <center>
        <ul style={{listStyleType: "none"}} >
          {
            entries.map(function(entry) {
              return (
                <li>
                  <a href={entry.route}>{entry.title}</a>
                </li>
              );
            })
          }
        </ul>
      </center>
    </div>
  )
};

export default HtmlLayout(Index);
