import React from 'react';
import HtmlLayout from '../HtmlLayout.js';
import { AboutComponent } from './About.js';

const Index = function Index({ entryNames, newEntryNames }) {
  return (
    <div>
      <center>
        <h1>Demoloops</h1>
        <div className="layoutSingleColumn" style={{
          display: 'flex',
          flexWrap: 'wrap',
          listStyleType: 'none',
          justifyContent: 'space-around',
        }}
        >
          {
            entryNames.map((entry, i) => (
              <li key={entry} style={{ padding: 5 }}>
                <a href={`/demoloops/${entry}/`}>{(`00${i + 1}`).slice(-3)}</a>
              </li>
            ))
          }
          {
            newEntryNames.map((entry, i) => (
              <li key={entry} style={{ padding: 5 }}>
                <a href={`/demoloops/loop${entry}/`}>{(`00${entryNames.length + i + 1}`).slice(-3)}</a>
              </li>
            ))
          }
        </div>
        <h2>Special</h2>
        <div className="layoutSingleColumn" style={{
          listStyleType: 'none',
        }}
        >
          <li style={{ padding: 5 }}>
            <a href="/demoloops/hope/">"Hope" is the thing with feathers</a>
          </li>
          <li style={{ padding: 5 }}>
            <a href="/demoloops/sailor_moon/">Sailor Moon</a>
          </li>
        </div>
        <AboutComponent />
      </center>
    </div>
  );
};

Index.propTypes = {
  entryNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  newEntryNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default HtmlLayout(Index);
