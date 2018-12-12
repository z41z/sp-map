const point = require("../point/index");
const {
  sin,
  cos,
  pow,
  sqrt
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

const egg = (radius, level = 1, lng = 0, lat = 0, options = {}, degree = 0) => {
  let points = [];
  let center = offset(lng, lat, radius, degree);
  // y正半轴
  for (let i = 0, j = radius; i < j; i++) {
    let x1 = (level * i / j);
    let y1 = exp(level, x1);
    let calcRotateXY1 = calcRotateXY(x1, y1, degree);
    let pointX1 = center.lng + calcRotateXY1.xResult / distance(radius);
    let pointY1 = center.lat + calcRotateXY1.yResult / distance(radius);
    let point1 = point(pointX1, pointY1)
    points.push(point1)
  }
  // y负半轴
  for (let n = radius, m = n; m > 0; m--) {
    let x2 = (level * m / n);
    let y2 = -exp(level, x2);
    let calcRotateXY2 = calcRotateXY(x2, y2, degree);
    let pointX2 = center.lng + calcRotateXY2.xResult / distance(radius);
    let pointY2 = center.lat + calcRotateXY2.yResult / distance(radius);
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
const offset = (lng, lat, radius, degree = 0) => {
  let offsetX = lng - cos(degree) * (1 / 5) / distance(radius);
  let offsetY = lat - sin(degree) * (1 / 5) / distance(radius);
  return {
    lng: offsetX,
    lat: offsetY
  }
}

/**
 * x,y旋转后坐标计算
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} degree 
 */
const calcRotateXY = (x = 0, y = 0, degree = 0) => {
  let xResult = x * cos(degree) - y * sin(degree)
  let yResult = y * cos(degree) + x * sin(degree)
  return {
    xResult,
    yResult
  }
}

module.exports.default = module.exports = egg;