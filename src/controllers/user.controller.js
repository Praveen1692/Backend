import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndgenerateAccessToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false }); // to bypass the validation for saving token in DB

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
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
        $or: [{ email: email }, { username: username }],
    });
    if (existedUser) {
        throw new Error("Email or Username already exists");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath || !coverImageLocalPath) {
        res.status(400).json({
            msg: "Please select both Avatar & Cover Image",
        });
        return;
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if (!avatar || !coverImage) {
        throw new Error("image uploading failed");
    }
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        email,
        password,
        username,
        coverImage: coverImage.url,
    });
    const findUserById = await User.findById(user._id).select(
        "-password -refreshToken"
    );
    if (!findUserById) {
        throw new Error("Error in creating the account");
    }
    res.status(200).json(new ApiResponse(200, user, "User Created"));
});

const loginUser = asyncHandler(async (req, res) => {
    //Login User Todo
    // 1- get email and password from rew.body
    //-2- check th evalidation or like empty or not;
    // 3- check user exit or not;
    //4- if user exit print the user details and send access and refresh toekn to the user(SEND IN COOKIES);

    //GET THE DATA;
    const { username, email, password } = req.body;
    if (!username || !email) {
        return res.status(400).send("Username or  Email is missing");
    }

    // find the user  by his/her email or username ;
    const user = await User.findOne({
        $or: [{ username }, { email }],
    });
    if (!user) {
        return res
            .status(401)
            .send("User not exit or find based on email or username");
    }
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        return res.status(400).send("Password is not correct");
    }
    const { accessToken, refreshToken } =
        await generateAccessTokenAndgenerateAccessToken(user._id);

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
        .json(new ApiResponse(200, "Logged out"));
});

export { registerUser, loginUser, logoutUser };
