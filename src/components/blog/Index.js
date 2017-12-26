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
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }} >
          {
            entries.map((entry) => (
              <li key={entry.route} style={{ padding: 5 }}>
                <a href={entry.route}>{entry.title}</a>
              </li>
            ))
          }
        </ul>
      </center>
    </div>
  );
};

Index.propTypes = {
  entryNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default HtmlLayout(Index);