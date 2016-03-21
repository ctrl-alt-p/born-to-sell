'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommentList = function CommentList(props) {
  var list = props.comments.map(function (comment) {
    return _react2.default.createElement(
      'li',
      { key: comment },
      comment
    );
  });

  return _react2.default.createElement(
    'ul',
    { className: 'comment-list' },
    list
  );
};

function mapStateToProps(state) {
  return { comments: state.comments };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CommentList);
module.exports = exports['default'];