import { run } from 'raf-runner';
import makeStateful from 'make-stateful';

import opening from './states/root/opening.js';
import main from './states/root/main.js';
import closing from './states/root/closing.js';

const [CLEAR, LGREEN, DGREEN] = ['rgba(0, 0, 0, 0)', 'rgb(129, 169, 152)', 'rgb(58, 136, 116)'];

const intersectRect = function intersectRect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return !(bx1 > ax2 || bx2 < ax1 || by1 > ay2 || by2 < ay1);
};

class Root {
  constructor(context) {
    this.context = context;

    this.enterState();
  }

  enterState() {
    this.handleClick = this.handleClick.bind(this);
    this.context.canvas.addEventListener('click', this.handleClick);
  }

  update(dt) {
    this.draw(dt);
  }

  draw() {
    const dpr = window.devicePixelRatio;
    const context = this.context;
    context.save();

    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);

    const [firstTransitionStart, firstTransitionEnd] = [height / 4, height / 4 + height / 3];
    const firstTransitionHeight = firstTransitionEnd - firstTransitionStart;

    const [secondTransitionStart, secondTransitionEnd] = [firstTransitionEnd, firstTransitionEnd + height / 3];
    const secondTransitionHeight = secondTransitionEnd - secondTransitionStart;

    this.drawLineColorTransition(12, 0, firstTransitionStart, width, firstTransitionHeight, CLEAR, LGREEN);
    context.fillStyle = LGREEN;
    context.fillRect(0, firstTransitionEnd, width, height - firstTransitionEnd);

    this.drawLineColorTransition(12, 0, secondTransitionStart, width, secondTransitionHeight, LGREEN, DGREEN);
    context.fillStyle = DGREEN;
    context.fillRect(0, secondTransitionEnd, width, height - secondTransitionEnd);

    context.fillStyle = 'black';
    context.shadowColor = 'black';
    context.shadowBlur = 10 * dpr;
    context.shadowOffsetX = 1 * dpr;
    context.shadowOffsetY = 1 * dpr;
    context.font = 2 * dpr + 'em serif';
    const tx = width / 2 - context.measureText('▲').width / 2;
    const ty = height - 22 * dpr;
    context.fillText('▲', tx, ty);

    context.restore();
  }

  drawLineColorTransition(numLines, ox, oy, w, h, startColor, endColor) {
    const context = this.context;
    const dy = h / numLines;
    for (let i = 0; i < numLines; i++) {
      const y = oy + i * dy;

      context.fillStyle = startColor;
      context.fillRect(ox, y, w, dy);

      context.fillStyle = endColor;
      context.fillRect(ox, y, w, i * dy / numLines);
    }
  }

  handleClick(e) {
    const dpr = window.devicePixelRatio;
    const canvas = this.context.canvas;

    const tx = canvas.width / 2 - 22 * dpr;
    const ty = canvas.height - 55 * dpr;
    const [tw, th] = [44 * dpr, 44 * dpr];
    const [cx, cy] = [e.clientX * dpr, e.clientY * dpr];

    const clickedSwitch = intersectRect(tx, ty, tx + tw, ty + th, cx, cy, cx, cy);

    if (clickedSwitch) {
      this.gotoState('Opening');
    }
  }

  exitState() {
    this.context.canvas.removeEventListener('click', this.handleClick);
  }
}

const setupCanvasDimensions = function setupCanvasDimensions() {
  const canvas = document.getElementById('bgCanvas');
  canvas.width = canvas.scrollWidth * window.devicePixelRatio;
  canvas.height = canvas.scrollHeight * window.devicePixelRatio;
};
window.addEventListener('resize', setupCanvasDimensions);
setupCanvasDimensions();

makeStateful(Root);
Root.addState('Opening', opening);
Root.addState('Main', main);
Root.addState('Closing', closing);

const rootEntity = new Root(document.getElementById('bgCanvas').getContext('2d'));
run(rootEntity.update.bind(rootEntity));
