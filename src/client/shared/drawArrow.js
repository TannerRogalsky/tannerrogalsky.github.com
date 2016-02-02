const drawArrow = function drawArrow(context, x, y, w, h, rotation) {
  const dpr = window.devicePixelRatio;

  context.fillStyle = 'black';
  context.shadowColor = 'black';
  context.shadowBlur = 10 * dpr;
  context.shadowOffsetX = 1 * dpr;
  context.shadowOffsetY = 1 * dpr;

  context.translate(x, y);
  context.rotate(rotation);
  context.beginPath();
  context.moveTo(0, -w / 2);
  context.lineTo(w / 2, h / 2);
  context.lineTo(-w / 2, h / 2);
  context.fill();
};

export default drawArrow;
