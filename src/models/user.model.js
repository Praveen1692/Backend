import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "User Name is required"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: [true, "E-mail is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: [true, "Full Name is required"],
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: [true,'Avatar is required'],
        },
        coverImage: {
            type: String, // cloudinary url

        },
        watchHistory: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Video",
            },
        ],
        password: {
            //type:bcrypt.hashSync(String,8),
            type: String,
            required: [true, "Password is required"],
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

// check krna ye wala code
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect= async function (password){
    return await bcrypt.compare(password,this.password)
    

}

userSchema.methods.generateAccessToken = async function () {
   return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

userSchema.methods.generateRefreshToken = async function () {
 return   jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: '1h',
        }
    );
};

export const User = mongoose.model("User", userSchema);
