import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

const Index = function Index({ entryNames }) {
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
                <a href={`/demoloops/${entry}/`}>{i + 1}</a>
              </li>
            ))
          }
        </div>

        <p><a href="/demoloops/about">About</a></p>
      </center>
    </div>
  );
};

Index.propTypes = {
  entryNames: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default HtmlLayout(Index);
