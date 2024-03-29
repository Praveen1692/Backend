"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _app = _interopRequireDefault(require("./app.js"));

var _index = _interopRequireDefault(require("./Db/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//require('dotenv').config();
_dotenv["default"].config({
  path: "./env"
});

(0, _index["default"])().then(function () {
  _app["default"].listen(3000, function () {
    console.log("Fast started on port 3000}");
  });
})["catch"](function (error) {
  return console.log("Mongo DB Connect Fail" + error);
}); // mongodb://localhost:27017/newData

/*
import express from "express";
import mongoose from "mongoose";
const app = express();

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/newData');

        app.on("error", (error) => {
            console.log("unable to connect to DB..");
            throw error;
        });
        app.listen(process.env.PORT,()=>{
            console.log(`Server listen at port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log("Error Occur" + error);
        throw error;
    }
})();

*/