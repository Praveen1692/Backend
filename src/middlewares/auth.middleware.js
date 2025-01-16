import { asyncHandler } from "../utils/asyncHandler.js";

import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return next("No token provided");

        const decodeToken = jwt.verify(token, "rendom string");

        const user = await User.findById(decodeToken?._id).select(
            "-password -refreshToken"
        );
        if (!user) {
            return res
                .status(401)
                .send({ error: "The user with this token does not exist" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
    }
});
