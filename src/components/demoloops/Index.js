import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

const Index = function Index({ entryNames }) {
  return (
    <div>
      <center>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }} >
          {
            entryNames.map((entry) => (
              <li key={entry} style={{ padding: 5 }}>
                <a href={`/demoloops/${entry}/`}>{entry}</a>
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
