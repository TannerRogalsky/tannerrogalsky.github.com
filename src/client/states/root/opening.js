const [CLEAR, LGREEN, DGREEN] = ['rgba(0, 0, 0, 0)', 'rgb(129, 169, 152)', 'rgb(58, 136, 116)'];

const targetTransitionTime = 2;

const clamp = function clamp(x, a, b) {
  return Math.max(a, Math.min(x, b));
};

const overlay = document.getElementById('overlay');

const smoothstep = function smoothstep(edge0, edge1, x) {
    // Scale, bias and saturate x to 0..1 range
    const newX = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    // Evaluate polynomial
    return newX * newX * (3 - 2 * newX);
};

const opening = {
  enterState() {
    this.t = 0;
  },

  draw(dt) {
    this.t += dt;

    const dpr = window.devicePixelRatio;
    const context = this.context;
    context.save();

    const { width, height } = context.canvas;
    context.clearRect(0, 0, width, height);
    const transitionHeight = height - smoothstep(0, height, this.t / targetTransitionTime * height) * height;
    overlay.style.opacity = 1 - this.t / targetTransitionTime;

    const [firstTransitionStart, firstTransitionEnd] = [transitionHeight / 4, transitionHeight / 4 + transitionHeight / 3];
    const firstTransitionHeight = firstTransitionEnd - firstTransitionStart;

    const [secondTransitionStart, secondTransitionEnd] = [firstTransitionEnd, firstTransitionEnd + transitionHeight / 3];
    const secondTransitionHeight = secondTransitionEnd - secondTransitionStart;

    this.drawLineColorTransition(12, 0, firstTransitionStart, width, firstTransitionHeight, CLEAR, LGREEN);
    context.fillStyle = LGREEN;
    context.fillRect(0, firstTransitionEnd, width, transitionHeight - firstTransitionEnd);

    this.drawLineColorTransition(12, 0, secondTransitionStart, width, secondTransitionHeight, LGREEN, DGREEN);
    context.fillStyle = DGREEN;
    context.fillRect(0, secondTransitionEnd, width, height - secondTransitionEnd);

    context.fillStyle = 'black';
    context.shadowColor = 'black';
    context.shadowBlur = 10 * dpr;
    context.shadowOffsetX = 1 * dpr;
    context.shadowOffsetY = 1 * dpr;
    context.font = 2 * dpr + 'em serif';
    const tw = context.measureText('▲').width;
    const tx = width / 2 - tw / 2 * (1 - (this.t / targetTransitionTime * 2));
    const ty = transitionHeight - 22 * dpr * (1 - this.t / targetTransitionTime * 2);
    context.translate(tx, ty);
    context.rotate(this.t / targetTransitionTime * Math.PI);
    context.fillText('▲', 0, 0);

    context.restore();

    if (this.t >= targetTransitionTime) {
      this.gotoState('Main');
    }
  },

  exitState() {
    delete this.t;
  },
};

export default opening;
