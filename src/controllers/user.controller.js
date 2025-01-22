import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";
const generateAccessTokenAndgenerateRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // to bypass the validation for saving token in DB

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            "Something Went Wrong in generateAccessTokenAndgenerateRefreshToken"
        );
    }
};

const registerUser = asyncHandler(async (req, res) => {
    // get user details from body {}
    // check validation {check username is already exit or not like {email , name empty to nhi hai}}
    // check for image, check for avatar or required filed;
    // create user object  -> create entry in db;
    // remove password and refresh token filed from response
    // check for user creastion response and return response
    // save in db

    // all details comed from body;
    const { username, email, fullname, password } = req.body;
    //console.log(username);
    if (!username || !email || !fullname || !password) {
        res.status(400).send("please provide complete information");
        return;
    }

    const existedUser = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (existedUser) {
        throw new ApiError(409, "Email or Username already exists");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    console.log(avatarLocalPath); // for debug

    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log(coverImageLocalPath); // for debug

    if (!avatarLocalPath || !coverImageLocalPath) {
        res.status(400).json({
            msg: "Please select both Avatar & Cover Image",
        });
        return;
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log(avatar);

    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log(coverImage);

    if (!avatar) {
        throw new ApiError(400, "image uploading failed");
    }
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase(),
        coverImage: coverImage.url || " ",
    });
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!createdUser) {
        throw new ApiError(500, "Error in creating the account");
    }
    res.status(201).json(new ApiResponse(200, user, "User Created"));
});

const loginUser = asyncHandler(async (req, res) => {
    //Login User Todo
    // 1- get email and password from rew.body
    //-2- check th evalidation or like empty or not;
    // 3- check user exit or not;
    //4- if user exit print the user details and send access and refresh toekn to the user(SEND IN COOKIES);

    //GET THE DATA;
    const { username, email, password } = req.body;
    if (!(username || !email)) {
        throw new ApiError(400, "username or email is required");
    }

    // find the user  by his/her email or username ;
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (!user) {
        throw new ApiError(401, "User Does not exit");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Password is not correct");
    }

    const { accessToken, refreshToken } =
        await generateAccessTokenAndgenerateRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    // for cookes  we need to use : httpOnly and secures identify cookes are update from backend only not from frotend;

    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User LoggedIN"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    // console.log('Logged Out')

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: { refreshToken: undefined },
        },
        {
            new: true,
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Logged out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;
    if (incomingRefreshToken) {
        throw new ApiError(401, "Unauthriazed Request");
    }
    jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET);
    
});

export { registerUser, loginUser, logoutUser, refreshAccessToken};
