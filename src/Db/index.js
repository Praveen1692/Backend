import mongoose from "mongoose";
import dotenv from "dotenv";
import express from "express";

import { DB_NAME } from "../constants.js";
dotenv.config();

const connectDB = async () => {
    // Connect to MongoDB database.
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`
        );
        //console.log(connectionInstance);
        // `${process.env.MONGODB_URI}/${DB_NAME}`
        console.log("Db", process.env.MONGO_URI);

        console.log(
            `\n Mongodb connected...${connectionInstance.connection.host}`
        );
    } catch (err) {
        console.error("Error" + err.message);

        process.exit(1);
    }
};
connectDB();

export default connectDB;
