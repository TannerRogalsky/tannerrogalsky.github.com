const overlay = document.getElementById('overlay');

const main = {
  enterState() {
    overlay.style.display = 'none';

    this.handleClick = this.handleClick.bind(this);
    this.context.canvas.addEventListener('click', this.handleClick);
  },

  update(dt) {
    this.arrow.rotation.y += dt;

    this.renderer.render(this.scene2D, this.camera2D, null, true);
    this.renderer.render(this.scene, this.camera);
  },

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
