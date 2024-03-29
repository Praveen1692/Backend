"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncHandler = void 0;

var asyncHandler = function asyncHandler(fn) {
  return function _callee(req, res, next) {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return regeneratorRuntime.awrap(fn(req, res, next));

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);
            console.log("Error " + _context.t0);
            return _context.abrupt("return", res.status(400).json({
              success: false,
              message: "A error occur"
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, null, null, [[0, 5]]);
  };
};

exports.asyncHandler = asyncHandler;