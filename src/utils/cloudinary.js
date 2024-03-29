import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: "dlrud73rg",
    api_key: "929424498164355",
    api_secret: "EN6vGWGpNyEs6pqBa4sP3k2L1RY",
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return "Could Not Find File Path";

        // upload the file on cloudinary;
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        // file as been  uploaded successfully , now we will remove it from our local system
        console.log("File Upload....", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the local saved temporary file as the upload opertaion got failed;
        return "Remove File";
    }
};

export { uploadOnCloudinary };
