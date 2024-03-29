"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadOnCloudinary = void 0;

var _cloudinary = require("cloudinary");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_cloudinary.v2.config({
  cloud_name: "dlrud73rg",
  api_key: "929424498164355",
  api_secret: "EN6vGWGpNyEs6pqBa4sP3k2L1RY"
});

var uploadOnCloudinary = function uploadOnCloudinary(localFilePath) {
  var response;
  return regeneratorRuntime.async(function uploadOnCloudinary$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;

          if (localFilePath) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", "Could Not Find File Path");

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_cloudinary.v2.uploader.upload(localFilePath, {
            resource_type: "auto"
          }));

        case 5:
          response = _context.sent;
          // file as been  uploaded successfully , now we will remove it from our local system
          console.log("File Upload....", response.url);
          return _context.abrupt("return", response);

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);

          _fs["default"].unlinkSync(localFilePath); // remove the local saved temporary file as the upload opertaion got failed;


          return _context.abrupt("return", "Remove File");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.uploadOnCloudinary = uploadOnCloudinary;