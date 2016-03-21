'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _redboxReact2 = require('redbox-react');

var _redboxReact3 = _interopRequireDefault(_redboxReact2);

var _react2 = require('react');

var _react3 = _interopRequireDefault(_react2);

var _reactTransformCatchErrors3 = require('react-transform-catch-errors');

var _reactTransformCatchErrors4 = _interopRequireDefault(_reactTransformCatchErrors3);

var _reactRedux = require('react-redux');

var _actions = require('../actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _components = {
  CommentBox: {
    displayName: 'CommentBox'
  }
};

var _reactTransformCatchErrors2 = (0, _reactTransformCatchErrors4.default)({
  filename: 'src/components/comment_box.js',
  components: _components,
  locals: [],
  imports: [_react3.default, _redboxReact3.default]
});

function _wrapComponent(id) {
  return function (Component) {
    return _reactTransformCatchErrors2(Component, id);
  };
}

var CommentBox = _wrapComponent('CommentBox')(function (_Component) {
  (0, _inherits3.default)(CommentBox, _Component);

  function CommentBox(props) {
    (0, _classCallCheck3.default)(this, CommentBox);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(CommentBox).call(this, props));

    _this.state = { comment: '' };
    return _this;
  }

  (0, _createClass3.default)(CommentBox, [{
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ comment: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      this.props.saveComment(this.state.comment);
      this.setState({ comment: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react3.default.createElement(
        'form',
        { onSubmit: this.handleSubmit.bind(this), className: 'comment-box' },
        _react3.default.createElement(
          'h4',
          null,
          'Add a comment'
        ),
        _react3.default.createElement('textarea', {
          value: this.state.comment,
          onChange: this.handleChange.bind(this) }),
        _react3.default.createElement(
          'div',
          null,
          _react3.default.createElement(
            'button',
            { action: 'submit' },
            'Submit Comment'
          )
        )
      );
    }
  }]);
  return CommentBox;
}(_react2.Component));

exports.default = (0, _reactRedux.connect)(null, actions)(CommentBox);
module.exports = exports['default'];