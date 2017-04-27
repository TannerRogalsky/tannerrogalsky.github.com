const rectangleGeometry = function rectangleGeometry(x, y, w, h) {
  const geometry = new THREE.Geometry();
  geometry.vertices = [
    new THREE.Vector3(x + 0, y + 0, -1),
    new THREE.Vector3(x + w, y + 0, -1),
    new THREE.Vector3(x + 0, y + h, -1),
    new THREE.Vector3(x + w, y + h, -1),
  ];
  geometry.faces = [
    new THREE.Face3(0, 2, 1),
    new THREE.Face3(2, 3, 1),
  ];
  geometry.computeFaceNormals();
  return geometry;
};

export default rectangleGeometry;
