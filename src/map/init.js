let scroll = require("./scroll");

/**
 * 
 * @param {String} elId 
 * @param {Number} lng 
 * @param {Number} lat 
 * @param {Number} zoomLevel 
 */
let init = (elId, lng = 0, lat = 0, zoomLevel = 3) => {
  let _map = new BMap.Map(elId);
  window._map = _map;
  _map.centerAndZoom(new BMap.Point(lng, lat), zoomLevel);
  scroll();
  return _map;
};

module.exports.default = module.exports = init;