import toast from "react-hot-toast";
import { cloudinaryFolder } from "./constants";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

export const uploadToCloudinary = async (pics, fileType) => {
    const toastId = toast.loading("Uploading Media...");
    if(pics && fileType) {
        // Check if the file size exceeds 2MB (2 * 1024 * 1024 bytes)
        if(pics.size > 2*1024*1024) {
            console.log("Error: File size exceeds 2MB");
            toast.dismiss(toastId);
            toast.error("File Size must be less than 2MB");
            return null;
        }

        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("cloud_name", CLOUD_NAME);
        data.append("folder", cloudinaryFolder);

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${fileType}/upload`,
                {
                    method: "post",
                    body: data,
                }
            );
            const fileData = await res.json();
            console.log("Upload File Response: ", fileData);
            toast.dismiss(toastId);
            return fileData.url;
        } catch (error) {
            console.error("Error Uploading File: ", error);
            toast.dismiss(toastId);
            return "Error Uploading File";
        }
    } else {
        console.log("Error: Missing file or fileType");
        toast.dismiss(toastId);
        return "Error: Missing file or fileType";
    }
};