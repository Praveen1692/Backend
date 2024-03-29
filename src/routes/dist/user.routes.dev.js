"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = require("../controllers/user.controller.js");

var _multerMiddlware = require("../middlewares/multer.middlware.js");

var router = (0, _express.Router)();
router.route("/register").post(_multerMiddlware.upload.fields([{
  name: "avatar",
  maxCount: 1
}, {
  name: "coverImage",
  maxCount: 1
}]), _userController.registerUser);
var _default = router;
exports["default"] = _default;