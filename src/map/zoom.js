/**
 * 
 * @param {Number} zoomLevel 
 * @param {Map} map 
 */

let zoom = (zoomLevel = 3, map = window._map) => {
  map.setZoom(zoomLevel);
};

module.exports.default = module.exports = zoom;