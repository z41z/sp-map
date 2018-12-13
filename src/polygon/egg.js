const point = require("../point/index");
const {
  sin,
  cos,
  pow,
  sqrt,
  rotateByDegree
} = require("sp-math");

/**
 * http://www.mathematische-basteleien.de/eggcurves.htm
 * @param {Number} radius 
 * @param {Number} level 
 * @param {Number} lng 
 * @param {Number} lat 
 * @param {Object} options 
 * @param {String} direction = top,right,bottom,left 
 */

const egg = (radius, windLevel = 1, lng = 0, lat = 0, options = {}, degree = 0) => {
  let points = [];
  let wind = transWindLevel(windLevel);
  let center = offset(lng, lat, radius, degree, wind);
  // y正半轴
  for (let i = 0, j = radius; i < j; i++) {
    let x1 = ((0.3 / wind + 1) * i / j);
    let y1 = exp((0.3 / wind + 1), x1);
    let {
      x,
      y
    } = rotateByDegree(x1, y1, degree);
    let pointX1 = center.lng + x / distance(radius);
    let pointY1 = center.lat + y / distance(radius);
    let point1 = point(pointX1, pointY1)
    points.push(point1)
  }
  // y负半轴
  for (let n = radius, m = n; m > 0; m--) {
    let x2 = ((0.3 / wind + 1) * m / n);
    let y2 = -exp((0.3 / wind + 1), x2);
    let {
      x,
      y
    } = rotateByDegree(x2, y2, degree);
    let pointX2 = center.lng + x / distance(radius);
    let pointY2 = center.lat + y / distance(radius);
    let point2 = point(pointX2, pointY2)
    points.push(point2)
  }
  let polygon = new BMap.Polygon(points, options)
  return polygon;
};

/**
 * 求y值
 * @param {Number} level 
 * @param {Number} x 
 */
const exp = (level, x) => {
  return sqrt(sqrt(level) * x - pow(x, 3 / 2));
}

/**
 * 距离经纬度模糊换算
 * @param {*Number} radius 
 */
const distance = (radius) => {
  return 1e5 / radius;
}

/**
 * 中心点偏移量:偏移比例默认1/3
 * @param {Number} lng 
 * @param {Number} lat 
 * @param {String} direction = top,right,bottom,left 
 */
const offset = (lng, lat, radius, degree = 0, level = 0) => {
  let offsetX = lng - cos(degree) * level / distance(radius);
  let offsetY = lat - sin(degree) * level / distance(radius);
  return {
    lng: offsetX,
    lat: offsetY
  }
}

const transWindLevel = (windLevel) => {
  return (6 - windLevel / 2) / 12;
}
module.exports.default = module.exports = egg;