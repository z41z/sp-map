let point = require("../point/index");

/**
 * 
 * @param {Number} lng 
 * @param {Number} lat 
 * @param {Map} map 
 */
let moveTo = (lng, lat, map = window._map) => {
  map.panTo(point(lng, lat));
};

module.exports.default = module.exports = moveTo;