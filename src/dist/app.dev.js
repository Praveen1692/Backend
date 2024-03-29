"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));

var _cors = _interopRequireDefault(require("cors"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(_express["default"].json({
  limit: "50mb"
})); // to support JSON-encoded bodies

app.use(_express["default"].urlencoded({
  extended: true
})); // to support URL-encoded bodies

app.use(_express["default"]["static"]("public"));
app.use((0, _cookieParser["default"])()); // Routes;

app.use("/api/v1/users", _userRoutes["default"]); // /api/v1/users/register

var _default = app;
exports["default"] = _default;