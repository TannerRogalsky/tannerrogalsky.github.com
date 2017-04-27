const setRectangleVertices = function setRectangleVertices(vertices, x, y, w, h) {
  vertices[0].set(x + 0, y + 0, -1);
  vertices[1].set(x + w, y + 0, -1);
  vertices[2].set(x + 0, y + h, -1);
  vertices[3].set(x + w, y + h, -1);
};

export default setRectangleVertices;
