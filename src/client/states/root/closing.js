import { targetTransitionTime } from '../../shared/background/constants.js';
import smoothstep from '../../shared/background/smoothstep.js';
import setRectangleVertices from '../../shared/background/setRectangleVertices.js';
import setLineColorTransition from '../../shared/background/setLineColorTransition.js';
const overlay = document.getElementById('overlay');

const closing = {
  enterState() {
    this.t = 0;

    this.arrowStartRotation = this.arrow.quaternion.clone();
  },

  update(dt) {
    this.t += dt;
    const ratio = this.t / targetTransitionTime;

    const { width, height } = this;
    const transitionHeight = smoothstep(0, 1, ratio) * height;
    overlay.style.opacity = ratio;

    const firstTransitionStart = transitionHeight / 4;
    const firstTransitionEnd = transitionHeight / 4 + transitionHeight / 3;
    const firstTransitionHeight = firstTransitionEnd - firstTransitionStart;

    const secondTransitionStart = firstTransitionEnd;
    const secondTransitionEnd = firstTransitionEnd + transitionHeight / 3;
    const secondTransitionHeight = secondTransitionEnd - secondTransitionStart;

    setLineColorTransition(this.scene2D, 0, 12, 0, firstTransitionStart, width, firstTransitionHeight);
    setLineColorTransition(this.scene2D, 24, 12, 0, secondTransitionStart, width, secondTransitionHeight);

    {
      const geometry = this.scene2D.children[48].geometry;
      setRectangleVertices(geometry.vertices, 0, secondTransitionEnd, width, height - secondTransitionEnd);
      geometry.verticesNeedUpdate = true;
    }

    this.arrow.position.y = smoothstep(0, 1, ratio) * -7 + 3.5;
    THREE.Quaternion.slerp(this.arrowStartRotation, this.arrowTargetRotation, this.arrow.quaternion, ratio);

    this.renderer.render(this.scene2D, this.camera2D, null, true);
    this.renderer.render(this.scene, this.camera);

    if (this.t >= targetTransitionTime) {
      this.gotoState();
    }
  },

  exitState() {
    delete this.t;
    delete this.arrowStartRotation;
    delete this.arrowTargetRotation;
  },
};

export default closing;
