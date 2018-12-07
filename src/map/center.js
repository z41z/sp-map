/**
 * 
 * @param {Point} point 
 * @param {Map} map 
 */
let center = (point, map = window._map) => {
  map.setCenter(point);
};

module.exports.default = module.exports = center;