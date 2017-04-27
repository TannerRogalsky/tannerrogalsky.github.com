const orthographicMatrix = function orthographicMatrix(left, right, bottom, top) {
  const matrix = new Float32Array(16);

  matrix[0] = 2 / (right - left);
  matrix[5] = 2 / (top - bottom);
  matrix[10] = -1;

  matrix[12] = -(right + left) / (right - left);
  matrix[13] = -(top + bottom) / (top - bottom);

  matrix[15] = 1;

  return matrix;
};

export default orthographicMatrix;
