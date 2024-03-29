"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = void 0;

var _asyncHandler = require("../utils/asyncHandler.js");

var registerUser = (0, _asyncHandler.asyncHandler)(function _callee(req, res) {
  var _req$body, username, email, fullname, password;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // get user details from body {}
          // check validation {check username is already exit or not like {email , name empty to nhi hai}}
          // check for image, check for avatar or required filed;
          // create user object  -> create entry in db;
          // remove password and refresh token filed from response
          // check for user creastion response and return response 
          // save in db
          // all details comed from body;
          _req$body = req.body, username = _req$body.username, email = _req$body.email, fullname = _req$body.fullname, password = _req$body.password;
          console.log(username);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.registerUser = registerUser;