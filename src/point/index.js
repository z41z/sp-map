/**
 * 
 * @param {Number} lng 
 * @param {Number} lat 
 */

let point = (lng = 0, lat = 0) => {
  return new BMap.Point(lng, lat);
};

module.exports.default = module.exports = point;