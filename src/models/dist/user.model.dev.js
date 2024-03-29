"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    required: [true, 'User Name is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  fullname: {
    type: String,
    required: [true, 'Full Name is required'],
    trim: true,
    index: true
  },
  avatar: {
    type: String // cloudinary url
    // required: [true,'Avatar is required'],

  },
  coverImage: {
    type: String
  },
  watchHistory: [{
    type: _mongoose["default"].Types.ObjectId,
    ref: "Video"
  }],
  password: {
    //type:bcrypt.hashSync(String,8),
    type: String,
    required: [true, 'Password is required']
  },
  refreshToken: {
    type: String
  }
}, {
  timestamps: true
}); // check krna ye wala code

userSchema.pre('save', function _callee(next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (this.isModified("password")) {
            _context.next = 2;
            break;
          }

          return _context.abrupt("return", next());

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(_bcrypt["default"].hash(this.password, 10));

        case 4:
          this.password = _context.sent;
          next();

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, null, this);
});

userSchema.methods.generateAccessToken = function () {
  _jsonwebtoken["default"].sign({
    _id: this._id,
    email: this.email
  }, process.env.ACCESS_TOKEN_SECRET);
};

userSchema.methods.generateRefreshToken = function () {};

var User = _mongoose["default"].model("User", userSchema);

exports.User = User;