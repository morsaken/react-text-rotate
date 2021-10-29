'use strict';

var react = require('react');
var PropTypes = require('prop-types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);

var timer;

var App = _ref => {
  var {
    texts,
    period = 2000,
    speed = 1
  } = _ref;
  var mounted = react.useRef(false);
  var [text, setText] = react.useState('');
  var textRef = react.useRef(text);
  textRef.current = text;
  var [index, setIndex] = react.useState(0);
  var indexRef = react.useRef(index);
  indexRef.current = index;
  var [deleting, setDeleting] = react.useState(false);
  var deletingRef = react.useRef(deleting);
  deletingRef.current = deleting;
  react.useEffect(() => {
    mounted.current = true;

    if (Array.isArray(texts)) {
      tick();
    }

    return () => {
      mounted.current = false;
      if (timer) clearTimeout(timer);
    };
  }, []);
  react.useEffect(() => {
    if (Array.isArray(texts) && index >= texts.length) {
      setIndex(0);
    }
  }, [index]);
  var tick = react.useCallback(() => {
    if (mounted.current) {
      var _deleting = deletingRef.current;
      var _index = indexRef.current;
      var fullTxt = texts[_index];
      var _text = textRef.current;

      if (_deleting) {
        _text = fullTxt.substring(0, _text.length - 1);
      } else {
        _text = fullTxt.substring(0, _text.length + 1);
      }

      var delta = 200 - Math.random() * 70;
      if (_deleting) delta /= 2;
      delta /= speed;

      if (!_deleting && _text === fullTxt) {
        delta = period;
        setDeleting(true);
      } else if (_deleting && _text === '') {
        setDeleting(false);
        setIndex(state => state + 1);
        delta = 500;
      }

      setText(_text);
      timer = setTimeout(tick, delta);
    }
  }, []);
  return /*#__PURE__*/React.createElement("span", null, text);
};

App.propTypes = {
  texts: PropTypes__default["default"].arrayOf(PropTypes__default["default"].string).isRequired,
  period: PropTypes__default["default"].number,
  speed: PropTypes__default["default"].number
};

module.exports = App;
