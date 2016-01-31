import { run } from 'raf-runner';

const canvas = document.getElementById('bgCanvas');
const context = canvas.getContext('2d');

const [CLEAR, LGREEN, DGREEN] = ['rgba(0, 0, 0, 0)', 'rgb(129, 169, 152)', 'rgb(58, 136, 116)'];

let t = 0;
const draw = function draw(dt) {
  t += dt;
  context.save();

  const { width, height } = canvas;
  context.clearRect(0, 0, width, height);

  const [firstTransitionStart, firstTransitionEnd] = [height  / 4, height  / 4 + height / 3];
  const firstTransitionHeight = firstTransitionEnd - firstTransitionStart;

  const [secondTransitionStart, secondTransitionEnd] = [firstTransitionEnd, firstTransitionEnd + height / 3];
  const secondTransitionHeight = secondTransitionEnd - secondTransitionStart;

  drawLineColorTransition(12, 0, firstTransitionStart, width, firstTransitionHeight, CLEAR, LGREEN);
  context.fillStyle = LGREEN;
  context.fillRect(0, firstTransitionEnd, width, height - firstTransitionEnd);

  drawLineColorTransition(12, 0, secondTransitionStart, width, secondTransitionHeight, LGREEN, DGREEN);
  context.fillStyle = DGREEN;
  context.fillRect(0, secondTransitionEnd, width, height - secondTransitionEnd);

  context.fillStyle = 'black';
  context.shadowColor = 'black';
  context.shadowBlur = 10 * window.devicePixelRatio;
  context.shadowOffsetX = 1 * window.devicePixelRatio;
  context.shadowOffsetY = 1 * window.devicePixelRatio;
  context.font = 2 * window.devicePixelRatio + 'em serif';
  const tx = width / 2 - context.measureText('▲').width / 2;
  const ty = height - 22 * window.devicePixelRatio;
  context.fillText('▲', tx, ty);

  context.restore();
};

const drawCircuitLine = function drawCircuitLine(vertices) {
  context.strokeStyle = 'white';
  context.beginPath();
  context.moveTo(vertices[0], vertices[1]);
  for (let i = 2; i < vertices.length; i += 2) {
    context.lineTo(vertices[i], vertices[i + 1]);
  }
  context.stroke();

  drawPCBNode(vertices[0], vertices[1]);
  drawPCBNode(vertices[vertices.length - 2], vertices[vertices.length - 1]);
};

const drawPCBNode = function drawPCBNode(x, y) {
  context.fillStyle = 'white';
  context.beginPath();
  context.arc(x, y, 4 * window.devicePixelRatio, 0, 2*Math.PI);
  context.fill();

  context.fillStyle = 'black';
  context.beginPath();
  context.arc(x, y, 2 * window.devicePixelRatio, 0, 2*Math.PI);
  context.fill();
};

const drawLineColorTransition = function drawLineColorTransition(numLines, ox, oy, w, h, startColor, endColor) {
  const dy = h / numLines;
  for (let i = 0; i < numLines; i++) {
    const y = oy + i * dy;

    context.fillStyle = startColor;
    context.fillRect(ox, y, w, dy);

    context.fillStyle = endColor;
    context.fillRect(ox, y, w, i * dy / numLines);
  }
};

const intersectRect = function intersectRect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  return !(bx1 > ax2 || bx2 < ax1 || by1 > ay2 || by2 < ay1);
};

const setupCanvasDimensions = function setupCanvasDimensions() {
  canvas.width = canvas.scrollWidth * window.devicePixelRatio;
  canvas.height = canvas.scrollHeight * window.devicePixelRatio;
};
window.addEventListener('resize', setupCanvasDimensions);

const handleClick = function handleClick(e) {
  const dpr = window.devicePixelRatio;

  const tx = canvas.width / 2 - 22 * dpr;
  const ty = canvas.height - 55 * dpr;
  const [tw, th] = [44 * dpr, 44 * dpr]
  const [cx, cy] = [e.clientX * dpr, e.clientY * dpr];

  const clickedSwitch = intersectRect(tx, ty, tx + tw, ty + th, cx, cy, cx, cy);
};
canvas.addEventListener('click', handleClick);

setupCanvasDimensions();
run(draw);
