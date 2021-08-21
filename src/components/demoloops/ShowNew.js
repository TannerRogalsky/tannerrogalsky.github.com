import React from 'react';
import HtmlLayout from '../HtmlLayout.js';

import '../../styles/blog/show.css';

const Show = function Show({ prev, name, next }) {
  let realPrev = prev;
  if (typeof(realPrev) === 'string' && !realPrev.startsWith('loop')) {
    realPrev = `loop${realPrev}`;
  }

  return (
    <div className="layoutSingleColumn">
      <h1>Loop{name}</h1>
      <nav style={{ display: 'flex', justifyContent: 'space-around' }}>
      {
        realPrev ? <a href={`/demoloops/${realPrev}`}>{'<< Previous'}</a> : <span></span>
      }
      <a href="/demoloops/">{"^ Loops"}</a>
      {
        next ? <a href={`/demoloops/loop${next}`}>Next >></a> : <span></span>
      }
      </nav>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <canvas id="canvas" width="720" height="720" onContextMenu="event.preventDefault()"></canvas>
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
    ctx.finish_load(resources);

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
