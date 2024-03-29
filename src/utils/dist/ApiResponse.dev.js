"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiResponse = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiResponse = function ApiResponse(statusCode, data) {
  var message = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Success";

  _classCallCheck(this, ApiResponse);

  this.statusCode = statusCode, this.data = data, this.message = message, this.success = statusCode < 400;
};

exports.ApiResponse = ApiResponse;