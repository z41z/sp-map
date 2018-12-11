const point = require("../point/index");

/**
 * @refer: http://www.mathematische-basteleien.de/eggcurves.htm
 * @param {Number} radius 
 * @param {Number} level 
 * @param {Number} lng 
 * @param {Number} lat 
 * @param {Object} options 
 * @param {String} direction = top,right,bottom,left 
 */
const egg = (radius, level = 1, lng = 0, lat = 0, options = {}, direction = 'left') => {
  let points = [];
  let center = offset(lng, lat, radius, direction);
  // y正半轴
  for (let i = 0, j = radius; i < j; i++) {
    let x1 = (level * i / j);
    let y1 = exp(level, x1);
    let point1 = point(center.lng + x1 / distance(radius), center.lat + y1 / distance(radius))
    points.push(point1)
  }
  // y负半轴
  for (let n = radius, m = n; m > 0; m--) {
    let x2 = (level * m / n);
    let y2 = -exp(level, x2);
    let point2 = point(center.lng + x2 / distance(radius), center.lat + y2 / distance(radius))
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
  return Math.sqrt(Math.abs(Math.sqrt(level) * x - Math.pow(x, 3 / 2)));
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
const offset = (lng, lat, radius, direction = 'left') => {
  switch (direction) {
    case 'top':
      return {
        lng,
        lat: lat + (1 / 3) / distance(radius)
      };
    case 'right':
      return {
        lng: lng + (1 / 3) / distance(radius),
        lat
      };
    case 'bottom':
      return {
        lng,
        lat: lat - (1 / 3) / distance(radius)
      };
    case 'left':
      return {
        lng: lng - (1 / 3) / distance(radius),
        lat
      };
    default:
      return {
        lng: lng + (1 / 3) / distance(radius),
        lat
      };
  }
}

module.exports.default = module.exports = egg;