import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

import '../../styles/blog/show.css';

const Show = function Show({ prev, name, next }) {
  if (typeof(prev) == 'string' && !prev.startsWith("loop")) {
    prev = `loop${prev}`;
  }

  return (
    <div className="layoutSingleColumn">
      <h1>Loop{name}</h1>
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      {
        prev ? <a href={`/demoloops/${prev}`}>{'<< Previous'}</a> : <span></span>
      }
      <a href="/demoloops/">{"^ Loops"}</a>
      {
        next ? <a href={`/demoloops/loop${next}`}>Next >></a> : <span></span>
      }
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas className="emscripten" id="canvas" width="720" height="720" onContextMenu="event.preventDefault()"></canvas>
      </div>
      <script type="module" dangerouslySetInnerHTML={{ __html: `
import init, { load_script, Wrapper } from '/rs/pkg/web.js';

const canvas = document.getElementById("canvas");
const script = fetch('/rs/resources/demoloop${name}.rhai').then(r => r.text());

async function run() {
    await init();

    const ctx = new Wrapper(canvas);

    const source = await script;
    const resources = await load_script(source, '../../../rs/resources');
    console.log(ctx.finish_load(resources));

    const loop = () => {
        requestAnimationFrame(loop);
        ctx.draw(performance.now());
    }
    requestAnimationFrame(loop);
}
run();
        ` }}
      />
    </div>
  );
};

Show.propTypes = {
  prev: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  next: React.PropTypes.string,
};

export default HtmlLayout(Show);
