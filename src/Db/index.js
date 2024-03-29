import mongoose from "mongoose";

import express from "express";

import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    // Connect to MongoDB database.
    try {
        const connectionInstance = await mongoose.connect('mongodb://localhost:27017/newData');
        //console.log(connectionInstance);
        // `${process.env.MONGODB_URI}/${DB_NAME}`

       

        console.log(`\n Mongodb connected...${connectionInstance.connection.host}`);
    } catch (err) {
        console.error("Error" + err.message);
        process.exit(1);
    }
};
connectDB()

export default connectDB;
