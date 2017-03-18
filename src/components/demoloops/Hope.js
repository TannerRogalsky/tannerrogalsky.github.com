import React from 'react';
import HtmlLayout from '../HtmlLayout.js';
import EmscriptenModule from 'raw-loader!../../client/EmscriptenModule.js';

import '../../styles/blog/show.css';

const Hope = function Hope() {
  return (
    <div className="layoutSingleColumn">
      <h1>"Hope" is the thing with feathers</h1>
      <p><small><i>Please turn up the volume.</i></small></p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas className="emscripten" id="canvas" onContextMenu="event.preventDefault()"></canvas>
      </div>
      <h2>Collaborators</h2>
      <ul>
        <li>
          Mike Romaniak - <a href="http://mikeromaniak.com/">
            Site
          </a> • <a href="https://soundcloud.com/mikeromaniak/sets">
            Soundcloud
          </a>
        </li>
        <li>Ryan Wang - <a href="http://www.clearful.net/">Site</a></li>
        <li>Tanner Rogalsky - <a href="http://tannerrogalsky.com/">Site</a></li>
      </ul>
      <h2>
        "Hope" is the thing with feathers
      </h2>
      <p><i>By Emily Dickinson</i></p>
      <p>
        "Hope" is the thing with feathers -<br />
        That perches in the soul -<br />
        And sings the tune without the words -<br />
        And never stops - at all -<br />
      </p>
      <p>
        And sweetest - in the Gale - is heard -<br />
        And sore must be the storm -<br />
        That could abash the little Bird<br />
        That kept so many warm -<br />
      </p>
      <p>
        I've heard it in the chillest land -<br />
        And on the strangest Sea -<br />
        Yet - never - in Extremity,<br />
        It asked a crumb - of me.<br />
      </p>
      <script dangerouslySetInnerHTML={{ __html: EmscriptenModule }} />
      <script src={'/demoloops/hope.js'} />
    </div>
  );
};
export default HtmlLayout(Hope);
