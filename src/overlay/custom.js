/**
 * 
 * @param {Point} point 
 * @param {*} content 
 * @param {Object} style 
 */
function custom(point, content, offset = {
  top: 0,
  left: 0
}, style = {}) {
  this._point = point;
  this._content = content;
  this._style = style;
  this._offset = offset;
};

custom.prototype = new BMap.Overlay();

// 初始化
custom.prototype.initialize = function (map) {
  this._map = map;
  let div = this._div = document.createElement("div");
  div.style.position = "absolute";
  div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
  Object.assign(div.style, this._style);
  div.className = "custom-overlay";
  if (this._content instanceof Element) {
    div.appendChild(this._content);
  } else {
    div.innerHTML = this._content;
  }
  map.getPanes().labelPane.appendChild(div);
  return div;
};

// 绘制
custom.prototype.draw = function () {
  let top = 0;
  let left = 0;
  let map = this._map;
  let content = this._content;
  let pixel = map.pointToOverlayPixel(this._point);
  if (content instanceof Element) {
    left = content.offsetWidth / 2;
    top = content.offsetHeight;

    // fixed zoomed offset bug
    if (!localStorage.customLeft) {
      localStorage.setItem("customLeft", left)
      localStorage.setItem("customTop", top)
    }
  }
  this._div.style.left = pixel.x - (+localStorage.customLeft) + this._offset.left + "px";
  this._div.style.top = pixel.y - (+localStorage.customTop) - 20 + this._offset.top + "px";
};

module.exports.default = module.exports = custom;