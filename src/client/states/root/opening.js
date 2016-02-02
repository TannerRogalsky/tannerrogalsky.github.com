import drawArrow from '../../shared/drawArrow.js';

const [CLEAR, LGREEN, DGREEN] = ['rgba(0, 0, 0, 0)', 'rgb(129, 169, 152)', 'rgb(58, 136, 116)'];
const overlay = document.getElementById('overlay');
const targetTransitionTime = 2;

const clamp = function clamp(x, a, b) {
  return Math.max(a, Math.min(x, b));
};

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
    const { context, width, height } = this;
    context.save();

    context.clearRect(0, 0, width, height);
    const transitionHeight = height - smoothstep(0, 1, this.t / targetTransitionTime) * height;
    overlay.style.opacity = 1 - this.t / targetTransitionTime;

    const firstTransitionStart = transitionHeight / 4;
    const firstTransitionEnd = transitionHeight / 4 + transitionHeight / 3;
    const firstTransitionHeight = firstTransitionEnd - firstTransitionStart;

    const secondTransitionStart = firstTransitionEnd;
    const secondTransitionEnd = firstTransitionEnd + transitionHeight / 3;
    const secondTransitionHeight = secondTransitionEnd - secondTransitionStart;

    this.drawLineColorTransition(12, 0, firstTransitionStart, width, firstTransitionHeight, CLEAR, LGREEN);
    context.fillStyle = LGREEN;
    context.fillRect(0, firstTransitionEnd, width, transitionHeight - firstTransitionEnd);

    this.drawLineColorTransition(12, 0, secondTransitionStart, width, secondTransitionHeight, LGREEN, DGREEN);
    context.fillStyle = DGREEN;
    context.fillRect(0, secondTransitionEnd, width, height - secondTransitionEnd);


    const arrowSize = 22;
    const ty = transitionHeight - arrowSize * (1 - this.t / targetTransitionTime * 2);
    drawArrow(context, width / 2, ty, arrowSize, arrowSize, this.t / targetTransitionTime * Math.PI);

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
