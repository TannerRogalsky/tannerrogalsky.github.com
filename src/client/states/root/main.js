import drawArrow from '../../shared/drawArrow.js';

const [DGREEN] = ['rgb(58, 136, 116)'];

const intersectRect = function intersectRect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return !(bx1 > ax2 || bx2 < ax1 || by1 > ay2 || by2 < ay1);
};

const overlay = document.getElementById('overlay');

const main = {
  enterState() {
    overlay.style.display = 'none';

    this.handleClick = this.handleClick.bind(this);
    this.context.canvas.addEventListener('click', this.handleClick);
  },

  draw() {
    const dpr = window.devicePixelRatio;
    const context = this.context;
    context.save();

    const { width, height } = context.canvas;
    context.fillStyle = DGREEN;
    context.fillRect(0, 0, width, height);

    const arrowSize = 22 * dpr;
    drawArrow(context, width / 2, arrowSize, arrowSize, arrowSize, Math.PI);

    context.restore();
  },

  handleClick(e) {
    const dpr = window.devicePixelRatio;
    const canvas = this.context.canvas;

    const arrowSize = 22 * dpr;
    const tx = canvas.width / 2 - arrowSize;
    const ty = 0;
    const [tw, th] = [arrowSize * 2, arrowSize * 2];
    const [cx, cy] = [e.clientX * dpr, e.clientY * dpr];

    const clickedSwitch = intersectRect(tx, ty, tx + tw, ty + th, cx, cy, cx, cy);

    if (clickedSwitch) {
      this.gotoState('Closing');
    }
  },

  exitState() {
    overlay.style.display = '';

    this.context.canvas.removeEventListener('click', this.handleClick);
  },
};

export default main;
