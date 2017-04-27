import { run } from 'raf-runner';
import makeStateful from 'make-stateful';

import opening from './states/root/opening.js';
import main from './states/root/main.js';
import closing from './states/root/closing.js';

import createProgram from './shared/bootstrap/createProgram.js';
import drawRect from './shared/bootstrap/drawRect.js';
import createOrthographicMatrix from './shared/bootstrap/createOrthographicMatrix.js';

import rectangleGeometry from './shared/background/rectangleGeometry.js';
import { CLEAR, LGREEN, DGREEN } from './shared/background/constants.js';

const createLineColorTransition = function createLineColorTransition(group, numLines, ox, oy, w, h, sc, ec) {
  const dy = h / numLines;
  const sMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(sc[0], sc[1], sc[2]) });
  sMaterial.opacity = sc[3];
  sMaterial.depthTest = false;
  sMaterial.depthWrite = false;

  const eMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(ec[0], ec[1], ec[2]) });
  eMaterial.opacity = ec[3];
  eMaterial.depthTest = false;
  eMaterial.depthWrite = false;

  for (let i = 0; i < numLines; i++) {
    const y = oy + i * dy;

    const m1 = new THREE.Mesh(rectangleGeometry(ox, y, w, dy), sMaterial);
    const m2 = new THREE.Mesh(rectangleGeometry(ox, y, w, i * dy / numLines), eMaterial);

    m1.geometry.dynamic = true;
    m2.geometry.dynamic = true;

    group.add(m1);
    group.add(m2);
  }
};

let t = 0;

class Root {
  constructor(context) {
    this.context = context;
    this.defaultProgram = createProgram(this.context, `
      attribute vec3 VertexPosition;
      uniform mediump mat4 Projection;

      void main() {
       gl_Position = Projection * vec4(VertexPosition, 1.0);
      }`, `
      uniform mediump vec4 GlobalColor;

      void main() {
        gl_FragColor = GlobalColor;
      }`);
    this.context.useProgram(this.defaultProgram);

    this.enterState();
  }

  enterState() {
    this.handleClick = this.handleClick.bind(this);
    this.context.canvas.addEventListener('click', this.handleClick);
  }

  update(dt) {
    t += dt;
    this.width = this.context.canvas.scrollWidth;
    this.height = this.context.canvas.scrollHeight;
    const { width, height } = this;

    if (this.renderer) {
      this.arrow.material.opacity = Math.min(this.arrow.material.opacity + dt / 4, 1);

      this.renderer.render(this.scene2D, this.camera2D, null, true);
      this.renderer.render(this.scene, this.camera);
    } else { // we don't have three.js yet so run the bootstrap code
      const projection = createOrthographicMatrix(0, width, height, 0);
      const projectionLocation = this.context.getUniformLocation(this.defaultProgram, 'Projection');
      this.context.uniformMatrix4fv(projectionLocation, this.context.FALSE, projection);

      this.draw(dt);

      if (THREE) { // we've got three.js so initialize and switch renderers
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        this.camera.position.z = 5;

        this.scene2D = new THREE.Scene();
        this.camera2D = new THREE.OrthographicCamera(0, width, 0, height, 0.1, 1000);

        {
          const [firstTransitionStart, firstTransitionEnd] = [height / 4, height / 4 + height / 3];
          const firstTransitionHeight = firstTransitionEnd - firstTransitionStart;

          const [secondTransitionStart, secondTransitionEnd] = [firstTransitionEnd, firstTransitionEnd + height / 3];
          const secondTransitionHeight = secondTransitionEnd - secondTransitionStart;

          createLineColorTransition(this.scene2D, 12, 0, firstTransitionStart, width,
                                    firstTransitionHeight, CLEAR, LGREEN);

          createLineColorTransition(this.scene2D, 12, 0, secondTransitionStart, width,
                                    secondTransitionHeight, LGREEN, DGREEN);

          // fill in bottom row
          const mesh = new THREE.Mesh(
            rectangleGeometry(0, secondTransitionEnd, width, height - secondTransitionEnd),
            new THREE.MeshBasicMaterial({
              color: new THREE.Color(DGREEN[0], DGREEN[1], DGREEN[2]),
              depthTest: false,
              depthWrite: false,
            })
          );
          mesh.geometry.dynamic = true;
          this.scene2D.add(mesh);
        }

        this.renderer = new THREE.WebGLRenderer({
          canvas: this.context.canvas,
          context: this.context,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.autoClear = false;
        this.renderer.setSize(this.width, this.height);

        const arrowGeometry = new THREE.TetrahedronGeometry(1);
        // http://www.color-hex.com/color-palette/186
        arrowGeometry.faces[0].color.setRGB(0, 0, 0);
        arrowGeometry.faces[1].color.setRGB(255 / 255, 119 / 255, 170 / 255);
        arrowGeometry.faces[2].color.setRGB(170 / 255, 255 / 255, 119 / 255);
        arrowGeometry.faces[3].color.setRGB(119 / 255, 170 / 255, 255 / 255);
        const arrowMaterial = new THREE.MeshBasicMaterial({
          transparent: true,
          opacity: 0,
          vertexColors: THREE.FaceColors,
        });
        this.arrow = new THREE.Mesh(arrowGeometry, arrowMaterial);
        this.arrow.scale.set(0.2, 0.2, 0.2);
        this.arrow.position.y = -3.5;
        this.arrow.lookAt(this.camera.position);
        this.arrow.rotateY(Math.PI * 0.25);
        this.arrow.rotateX(Math.PI * 0.5);
        this.scene.add(this.arrow);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1); // soft white light
        this.scene.add(ambientLight);

        const dirLight = new THREE.PointLight(0xffffff, 1);
        dirLight.position.set(0, 0, this.camera.position.z);
        this.scene.add(dirLight);
      }
    }
  }

  draw() {
    const { context, width, height } = this;

    context.clearColor(1, 1, 1, 1);
    context.clear(context.COLOR_BUFFER_BIT);
    const colorLocation = context.getUniformLocation(this.defaultProgram, 'GlobalColor');

    const [firstTransitionStart, firstTransitionEnd] = [height / 4, height / 4 + height / 3];
    const firstTransitionHeight = firstTransitionEnd - firstTransitionStart;

    const [secondTransitionStart, secondTransitionEnd] = [firstTransitionEnd, firstTransitionEnd + height / 3];
    const secondTransitionHeight = secondTransitionEnd - secondTransitionStart;

    this.drawLineColorTransition(12, 0, firstTransitionStart, width, firstTransitionHeight, CLEAR, LGREEN);
    context.uniform4f(colorLocation, LGREEN[0], LGREEN[1], LGREEN[2], LGREEN[3]);
    drawRect(context, this.defaultProgram, 0, firstTransitionEnd, width, height - firstTransitionEnd);

    this.drawLineColorTransition(12, 0, secondTransitionStart, width, secondTransitionHeight, LGREEN, DGREEN);
    context.uniform4f(colorLocation, DGREEN[0], DGREEN[1], DGREEN[2], DGREEN[3]);
    drawRect(context, this.defaultProgram, 0, secondTransitionEnd, width, height - secondTransitionEnd);
  }

  drawLineColorTransition(numLines, ox, oy, w, h, startColor, endColor) {
    const context = this.context;
    const colorLocation = context.getUniformLocation(this.defaultProgram, 'GlobalColor');

    const dy = h / numLines;
    for (let i = 0; i < numLines; i++) {
      const y = oy + i * dy;

      context.uniform4f(colorLocation, startColor[0], startColor[1], startColor[2], startColor[3]);
      drawRect(context, this.defaultProgram, ox, y, w, dy);

      context.uniform4f(colorLocation, endColor[0], endColor[1], endColor[2], endColor[3]);
      drawRect(context, this.defaultProgram, ox, y, w, i * dy / numLines);
    }
  }

  handleClick(e) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    mouse.x = (e.x / this.width) * 2 - 1;
    mouse.y = -(e.y / this.height) * 2 + 1;

    raycaster.setFromCamera(mouse, this.camera);

    const intersects = raycaster.intersectObjects(this.scene.children);
    let clickedSwitch = false;
    for (let i = 0; i < intersects.length; i++) {
      if (intersects[i].object === this.arrow) {
        clickedSwitch = true;
        break;
      }
    }

    if (clickedSwitch) {
      this.arrowTargetRotation = this.arrow.quaternion.clone();
      this.gotoState('Opening');
    }
  }

  exitState() {
    this.arrow.material.opacity = 1;
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
window.THREE = null;

makeStateful(Root);
Root.addState('Opening', opening);
Root.addState('Main', main);
Root.addState('Closing', closing);

const rootEntity = new Root(document.getElementById('bgCanvas').getContext('webgl'));
// rootEntity.gotoState('Main')
run((dt) => {
  rootEntity.update(dt);
});
