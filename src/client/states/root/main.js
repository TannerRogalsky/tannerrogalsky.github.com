const [DGREEN] = ['rgb(58, 136, 116)'];

const intersectRect = function intersectRect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return !(bx1 > ax2 || bx2 < ax1 || by1 > ay2 || by2 < ay1);
};

const main = {
  enterState() {
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

    context.fillStyle = 'black';
    context.shadowColor = 'black';
    context.shadowBlur = 10 * dpr;
    context.shadowOffsetX = 1 * dpr;
    context.shadowOffsetY = 1 * dpr;
    context.font = `${2 * dpr}em serif`;
    const tx = width / 2 + context.measureText('▲').width / 2;
    const ty = 22 * dpr;
    context.translate(tx, ty);
    context.rotate(Math.PI);
    context.fillText('▲', 0, 0);

    context.restore();
  },

  handleClick(e) {
    const dpr = window.devicePixelRatio;
    const canvas = this.context.canvas;

    const tx = canvas.width / 2 - 22 * dpr;
    const ty = 22 * dpr;
    const [tw, th] = [44 * dpr, 44 * dpr];
    const [cx, cy] = [e.clientX * dpr, e.clientY * dpr];

    const clickedSwitch = intersectRect(tx, ty, tx + tw, ty + th, cx, cy, cx, cy);

    if (clickedSwitch) {
      this.gotoState('Closing');
    }
  },

  exitState() {
    this.context.canvas.removeEventListener('click', this.handleClick);
  },
};

export default main;
