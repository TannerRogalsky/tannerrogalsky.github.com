import React from 'react';
import HtmlLayout from '../HtmlLayout.js';
import EmscriptenModule from 'raw-loader!../../client/EmscriptenModule.js';

import '../../styles/blog/show.css';

const Show = function Show({ prev, name, next }) {
  return (
    <div className="layoutSingleColumn">
      <h1>{name}</h1>
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      {
        prev ? <a href={`/demoloops/${prev}`}>{'<< Previous'}</a> : <span></span>
      }
      <a href="/demoloops/">{"^ Loops"}</a>
      {
        next ? <a href={`/demoloops/${next}`}>Next >></a> : <span></span>
      }
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas className="emscripten" id="canvas" onContextMenu="event.preventDefault()"></canvas>
      </div>
      <script dangerouslySetInnerHTML={{ __html: EmscriptenModule }} />
      <script dangerouslySetInnerHTML={{ __html: `loadASM('${name}')` }} />
    </div>
  );
};

Show.propTypes = {
  prev: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  next: React.PropTypes.string,
};

export default HtmlLayout(Show);
