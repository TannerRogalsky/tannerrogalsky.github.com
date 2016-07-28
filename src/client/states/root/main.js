import drawArrow from '../../shared/drawArrow.js';

const [DGREEN] = ['rgb(58, 136, 116)'];
const MIN_BUTTON_SIZE = 44;
const overlay = document.getElementById('overlay');

const intersectRect = function intersectRect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return !(bx1 > ax2 || bx2 < ax1 || by1 > ay2 || by2 < ay1);
};

const floorTo = function floorTo(x, floorValue) {
  return Math.floor(x / floorValue) * floorValue;
};

const updateHorizontalUIPositions = function updateHorizontalUIPositions(ui, width, height) {
  ui.arrow.x = width / 2;
  ui.arrow.y = ui.arrow.h;

  const mainPadding = Math.max(height / 20, MIN_BUTTON_SIZE);
  const main = ui.main;
  main.x = width / 2;
  main.y = height / 2;
  main.h = Math.min(height - mainPadding * 2, 400);
  main.w = main.h;

  ui.ui1.h = floorTo(main.h, MIN_BUTTON_SIZE);
  ui.ui1.w = ui.ui1.h / 2;
  ui.ui1.x = main.x - main.w / 2 - ui.ui1.w / 2 - mainPadding;
  ui.ui1.y = height / 2;

  ui.ui2.h = floorTo(main.h, MIN_BUTTON_SIZE);
  ui.ui2.w = ui.ui2.h / 2;
  ui.ui2.x = main.x + main.w / 2 + ui.ui2.w / 2 + mainPadding;
  ui.ui2.y = height / 2;

  if (ui.ui1.x - mainPadding < ui.ui1.w / 2) {
    ui.ui1.x = mainPadding + ui.ui1.w / 2;
    ui.ui2.x = width - mainPadding - ui.ui2.w / 2;
  }
};

const updateVerticalUIPositions = function updateVerticalUIPositions(ui, width, height) {
  ui.arrow.x = width / 2;
  ui.arrow.y = ui.arrow.h;

  const mainPadding = Math.max(height / 20, MIN_BUTTON_SIZE);
  const main = ui.main;
  main.x = width / 2;
  main.y = height / 2;
  main.w = Math.min(width - width / 4, 400);
  main.h = main.w;

  ui.ui1.w = floorTo(main.w, MIN_BUTTON_SIZE);
  ui.ui1.h = floorTo(ui.ui1.w / 2, MIN_BUTTON_SIZE);
  ui.ui1.x = width / 2;
  ui.ui1.y = main.y - main.h / 2 - ui.ui1.h / 2 - mainPadding;

  ui.ui2.w = floorTo(main.w, MIN_BUTTON_SIZE);
  ui.ui2.h = floorTo(ui.ui2.w / 2, MIN_BUTTON_SIZE);
  ui.ui2.x = width / 2;
  ui.ui2.y = main.y + main.h / 2 + ui.ui2.h / 2 + mainPadding;

  if (ui.ui1.y - mainPadding < ui.ui1.h / 2) {
    ui.ui1.y = mainPadding + ui.ui1.h / 2;
    ui.ui2.y = height - mainPadding - ui.ui2.h / 2;
  }
};

const updateUIPositions = function updateUIPositions(ui, width, height) {
  if (width > height) {
    updateHorizontalUIPositions(ui, width, height);
  } else if (height > width) {
    updateVerticalUIPositions(ui, width, height);
  }
};

const fillRect = function fillRect(context, x, y, w, h) {
  context.fillRect(x - w / 2, y - h / 2, w, h);
};

const drawSquares = function drawSquares(context, main) {
  const { w, h } = main;
  const [ox, oy] = [main.x - w / 2, main.y - h / 2];
  const [dx, dy] = [w / Math.floor(main.w / MIN_BUTTON_SIZE), h / Math.floor(main.h / MIN_BUTTON_SIZE)];

  context.strokeStyle = 'black';
  context.beginPath();
  for (let x = ox; x < ox + w - 1; x += dx) {
    for (let y = oy; y < oy + h - 1; y += dy) {
      context.moveTo(x, y);
      context.lineTo(x + dx, y);
      context.lineTo(x + dx, y + dy);
      context.lineTo(x, y + dy);
      context.lineTo(x, y);
    }
  }
  context.stroke();
};

const main = {
  enterState() {
    overlay.style.display = 'none';

    this.ui = {
      arrow: { x: 0, y: 0, w: 22, h: 22 },
      main: { x: 0, y: 0, w: 0, h: 0 },
      ui1: { x: 0, y: 0, w: 0, h: 0 },
      ui2: { x: 0, y: 0, w: 0, h: 0 },
    };
    updateUIPositions(this.ui, this.width, this.height);

    this.handleClick = this.handleClick.bind(this);
    this.context.canvas.addEventListener('click', this.handleClick);
  },

  draw() {
    const { context, ui, width, height } = this;
    updateUIPositions(ui, width, height);
    context.save();

    context.fillStyle = DGREEN;
    context.fillRect(0, 0, width, height);

    context.globalAlpha = 0;
    context.fillStyle = 'white';
    fillRect(context, ui.main.x, ui.main.y, ui.main.w, ui.main.h);
    drawSquares(context, ui.main);

    context.fillStyle = 'blue';
    fillRect(context, ui.ui1.x, ui.ui1.y, ui.ui1.w, ui.ui1.h);
    drawSquares(context, ui.ui1);

    context.fillStyle = 'red';
    fillRect(context, ui.ui2.x, ui.ui2.y, ui.ui2.w, ui.ui2.h);
    drawSquares(context, ui.ui2);
    context.globalAlpha = 1;

    drawArrow(context, ui.arrow.x, ui.arrow.y, ui.arrow.w, ui.arrow.h, Math.PI);

    context.restore();
  },

  handleClick(e) {
    const arrow = this.ui.arrow;
    const tx = arrow.x - arrow.w;
    const ty = arrow.y - arrow.h;
    const [tw, th] = [arrow.w * 2, arrow.h * 2];
    const [cx, cy] = [e.x, e.y];

    const clickedSwitch = intersectRect(tx, ty, tx + tw, ty + th, cx, cy, cx, cy);

    if (clickedSwitch) {
      this.gotoState('Closing');
    }
  },

  exitState() {
    overlay.style.display = '';

    delete this.ui;
    this.context.canvas.removeEventListener('click', this.handleClick);
  },
};

export default main;
