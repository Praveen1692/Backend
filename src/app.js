import express from "express";
import Userrouter from "./routes/user.routes.js";

import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "50mb" })); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static("public"));
app.use(cookieParser());

// Routes;
app.use("/api/v1/users",Userrouter);

// /api/v1/users/register


export default app;
