// welcome to imooc.com
/**
 * @param {String} text
 * @param {String} [wholeMask] like `####-##`
 * @returns {String} Formatted text
 * 
 */
function format (text, wholeMask) {
  if (!wholeMask) return text;
  var maskStartRegExp = /^([^#ANXF]+)/;

  if (+text.length === 1 && maskStartRegExp.test(wholeMask)) {
    text = maskStartRegExp.exec(wholeMask)[0] + text;
  }

  var newText = '';
  var charOffset = 0;

  for (var i = 0; i < wholeMask.length; i++) {
    var mask = wholeMask.charAt(i);

    switch (mask) {
      case '#':
      case 'A':
      case '?':
      case 'N':
      case 'X':
      case 'F':
        break;

      default:
        text = text.replace(mask, '');
    }
  }

  for (var _i = 0, x = 1; x && _i < wholeMask.length; _i++) {
    var char = text.charAt(_i - charOffset);

    var _mask = wholeMask.charAt(_i);

    switch (_mask) {
      case '#':
        /\d/.test(char) ? newText += char : x = 0;
        break;

      case 'A':
        /[a-z]/i.test(char) ? newText += char : x = 0;
        break;

      case '?':
        charOffset += 1;
        break;

      case 'N':
        /[a-z0-9]/i.test(char) ? newText += char : x = 0;
        break;

      case 'F':
        /[a-zA-Z0-9]/i.test(char) ? newText += char : x = 0;
        break;

      case 'X':
        newText += char;
        break;

      default:
        newText += _mask;

        if (char && char !== _mask) {
          text = " ".concat(text);
        }

        break;
    }
  }

  return newText;
}

var trigger = function trigger(el, type) {
  var e = document.createEvent('HTMLEvents'); // 是否组织冒泡 是否阻止事件的默认操作

  e.initEvent(type, true, true); // 触发事件

  el.dispatchEvent(e);
};
/**
 * 获取第一个input
 * @param {HTMLElement} el
 * @returns {HTMLElement | HTMLInputElement}
 */

var queryInputElement = function queryInputElement(el) {
  return el instanceof HTMLInputElement ? el : el.querySelector('input') || el;
};

var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isEdge = UA && UA.indexOf('edge') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

function updateValue(el) {
  var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var value = el.value,
      _el$dataset = el.dataset,
      _el$dataset$previousV = _el$dataset.previousValue,
      previousValue = _el$dataset$previousV === void 0 ? '' : _el$dataset$previousV,
      mask = _el$dataset.mask;

  if (force || value && value !== previousValue && value.length > previousValue.length) {
    el.value = format(value, mask);

    if (isAndroid && isChrome) {
      setTimeout(function () {
        return trigger(el, 'input');
      }, 0);
    } else {
      trigger(el, 'input');
    }
  }

  el.dataset.previousValue = value;
}

function updateMask(el, mask) {
  el.dataset.mask = mask;
}

var directive = {
  bind: function bind(el, _ref) {
    var value = _ref.value;
    el = queryInputElement(el);
    updateMask(el, value);
    updateValue(el);
  },
  componentUpdated: function componentUpdated(el, _ref2) {
    var value = _ref2.value,
        oldValue = _ref2.oldValue;
    el = queryInputElement(el);
    var isMaskChanged = value !== oldValue;

    if (isMaskChanged) {
      updateMask(el, value);
    }

    updateValue(el, isMaskChanged);
  }
};

var plugin = (function (Vue) {
  Vue.directive('mask', directive);
});

export default plugin;
export { plugin as VueMaskPlugin, directive as VueMaskDirective };
// powered by sam
