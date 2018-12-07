/**
 * 
 * @param {Boolean} isScroll 
 * @param {Map} map 
 */

let scroll = (isScroll = true, map = window._map) => {
  if (isScroll) {
    map.enableScrollWheelZoom();
  } else {
    map.disableScrollWheelZoom();
  }
};

module.exports.default = module.exports = scroll;