// @flow
type Point = {
  x: number,
  y: number,
};

function zeros(size: number): number[] {
  return Array.from(Array(size).keys()).map(() => 0);
}

function denominator(i: number, points: Point[]) {
  let result = 1;
  const xi = points[i].x;
  for (let j = points.length - 1; j >= 0; j -= 1) {
    if (i !== j) {
      result *= xi - points[j].x;
    }
  }
  return result;
}

function interpolationPolynomial(i: number, points: Point[]) {
  let coefficients = zeros(points.length);
  coefficients[0] = 1 / denominator(i, points);
  let newCoefficients;

  for (let k = 0; k < points.length; k += 1) {
    if (k === i) {
      continue;
    }
    newCoefficients = zeros(points.length);
    for (let j = k < i ? k : k - 1; j >= 0; j -= 1) {
      newCoefficients[j + 1] += coefficients[j];
      newCoefficients[j] -= points[k].x * coefficients[j];
    }
    coefficients = newCoefficients;
  }
  return coefficients;
}

export default function getLagrangePolynomialCoefficients(points: Point[]) {
  const polynomial = zeros(points.length);
  let coefficients;
  for (let i = 0; i < points.length; i += 1) {
    coefficients = interpolationPolynomial(i, points);
    for (let k = 0; k < points.length; k += 1) {
      polynomial[k] += points[i].y * coefficients[k];
    }
  }
  return polynomial;
}
