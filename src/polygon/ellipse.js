const point = require("../point/index");
const circle = require("./circle");
const {
  cos,
  sin,
  rotateByDegree
} = require("sp-math");

/**
 * 
 * @param {Number} radius 
 * @param {Number} lng 
 * @param {Number} lat 
 * @param {Number} level 
 * @param {Object} options 
 * @param {Number} degree 
 */
const ellipse = (radius, lng = 0, lat = 0, level = 1, options = {}, degree = 0) => {
  let points = [];
  if (level === 0 || level === 1) {
    return circle(radius, lng, lat, options);
  }
  for (i = 0; i < 360; i++) {
    let r = radius / 1e5;
    let x1 = sin(i);
    let y1 = cos(i) / level;
    let {
      x,
      y
    } = rotateByDegree(x1 * r, y1 * r, degree);
    let p = point(lng + x, lat + y);
    points.push(p);
  }
  return new BMap.Polygon(points, options);
};

module.exports.default = module.exports = ellipse;