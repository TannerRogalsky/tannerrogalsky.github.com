import React from 'react';
import blogFileToRoute from '../../utils/blog_file_to_route';
import HtmlLayout from '../HtmlLayout.js';

const Index = function Index({ entryNames }) {
  const entries = entryNames.map((entryName) => {
    const entryData = require(`../../data/blog/${entryName}.js`).default;
    entryData.date = Date.parse(entryData.date);
    entryData.route = blogFileToRoute(entryName);
    return entryData;
  }).sort((a, b) => b.date - a.date);

  return (
    <div>
      <center>
        <ul style={{ listStyleType: 'none' }} >
          {
            entries.map((entry) => (
              <li key={entry.route}>
                <a href={entry.route}>{entry.title}</a>
              </li>
            ))
          }
        </ul>
      </center>
    </div>
  );
};

export default HtmlLayout(Index);
