import setRectangleVertices from './setRectangleVertices.js';

const setLineColorTransition = function setLineColorTransition(group, startIndex, numLines, ox, oy, w, h) {
  const dy = h / numLines;

  for (let i = 0; i < numLines; i++) {
    const y = oy + i * dy;

    const g1 = group.children[startIndex + i * 2].geometry;
    const g2 = group.children[startIndex + i * 2 + 1].geometry;

    setRectangleVertices(g1.vertices, ox, y, w, dy);
    setRectangleVertices(g2.vertices, ox, y, w, i * dy / numLines);

    g1.verticesNeedUpdate = true;
    g2.verticesNeedUpdate = true;
  }
};

export default setLineColorTransition;
