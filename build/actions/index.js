'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveComment = saveComment;

var _types = require('./types');

function saveComment(comment) {
  return {
    type: _types.SAVE_COMMENT,
    payload: comment
  };
}