import drawArrow from '../../shared/drawArrow.js';

const [DGREEN] = ['rgb(58, 136, 116)'];

const intersectRect = function intersectRect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return !(bx1 > ax2 || bx2 < ax1 || by1 > ay2 || by2 < ay1);
};

const overlay = document.getElementById('overlay');

const updateHorizontalUIPositions = function updateHorizontalUIPositions(ui, width, height) {
  ui.arrow.x = width / 2;
  ui.arrow.y = ui.arrow.h;
};

const updateVerticalUIPositions = function updateVerticalUIPositions(ui, width, height) {
  ui.arrow.x = width / 2;
  ui.arrow.y = ui.arrow.h;
};

const updateUIPositions = function updateUIPositions(ui, width, height) {
  if (width > height) {
    updateHorizontalUIPositions(ui, width, height);
  } else if (height > width) {
    updateVerticalUIPositions(ui, width, height);
  }
};

const main = {
  enterState() {
    overlay.style.display = 'none';

    const dpr = window.devicePixelRatio;
    this.ui = {
      arrow: { x: 0, y: 0 , w: 22 * dpr, h: 22 * dpr },
    };
    updateUIPositions(this.ui, this.context.canvas.width, this.context.canvas.height);

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

    const arrow = this.ui.arrow;
    drawArrow(context, arrow.x, arrow.y, arrow.w, arrow.h, Math.PI);

    context.restore();
  },

  handleClick(e) {
    const dpr = window.devicePixelRatio;
    const canvas = this.context.canvas;

    const arrow = this.ui.arrow;
    const tx = arrow.x - arrow.w;
    const ty = arrow.y - arrow.h;
    const [tw, th] = [arrow.w * 2, arrow.h * 2];
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
