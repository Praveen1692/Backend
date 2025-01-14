import dotenv from "dotenv";
import app from "./app.js";

import connectDB from "./Db/index.js";

dotenv.config({
    path: "./env",
});

connectDB()
    .then(() => {
        app.listen(3000, () => {
            console.log(`Project started on port 3000}`);
        });
    })
    .catch((error) => console.log("Mongo DB Connect Fail" + error));
