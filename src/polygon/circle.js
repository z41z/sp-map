const point = require("../point/index");

/**
 * 
 * @param {Number} radius 
 * @param {Number} lng 
 * @param {Number} lat 
 * @param {Object} options 
 */
const circle = (radius, lng, lat, options = {}) => {
  return new BMap.Circle(point(lng, lat), radius, options);
};

module.exports.default = module.exports = circle;