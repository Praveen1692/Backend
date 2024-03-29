//require('dotenv').config();

import dotenv from "dotenv";
import  app  from "./app.js";


import connectDB from "./Db/index.js";

dotenv.config({
    path: "./env",
});


connectDB()
.then(()=>{
    app.listen(3000, () => {
        console.log(`Fast started on port 3000}`);
    });
})
.catch((error)=> console.log("Mongo DB Connect Fail"+ error));

// mongodb://localhost:27017/newData


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
