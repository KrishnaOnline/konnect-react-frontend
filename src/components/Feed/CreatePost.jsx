import { useState } from "react";
import { IoImageSharp, IoSend } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { uploadToCloudinary } from "../../utils/uploadToCloudinary";
import { createPost, getAllPosts } from "../../services/operations/postApis";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


function CreatePost() {
    const {token} = useSelector(state => state.auth);
    const [selectedImage, setSelectedImage] = useState();
    const [selectedVideo, setSelectedVideo] = useState();
    const [post, setPost] = useState({
        image: selectedImage,
        caption: "",
        video: selectedVideo
    });
    const handlePost = async () => {
        const res = await createPost(post, token);
        console.log(res);
        // getPosts();
        // console.log(post);
    }

    const handleSelectImage = async (e) => {
        // const toastId = toast.loading("Uploading Media...");
        setSelectedVideo("");
        setPost((prevPost) => ({ ...prevPost, video: "" }));
        const imgUrl = await uploadToCloudinary(e.target.files[0], "image");
        if(imgUrl) {
            setSelectedImage(imgUrl);
            setPost((prevPost) => ({ ...prevPost, image: imgUrl }));
        }
        // toast.dismiss(toastId);
        console.log(imgUrl);
        // setSelectedImage(URL.createObjectURL(e.target.files[0]));
        // console.log(selectedImage);
    }
    const handleSelectVideo = async (e) => {
        // const toastId = toast.loading("Uploading Media...");
        setSelectedImage("");
        setPost((prevPost) => ({ ...prevPost, image: "" }));
        const vidUrl = await uploadToCloudinary(e.target.files[0], "video");
        if(vidUrl) {
            setSelectedVideo(vidUrl);
            setPost((prevPost) => ({ ...prevPost, video: vidUrl }));
        }
        // toast.dismiss(toastId);
        console.log(vidUrl);
    }
    // const getPosts = async () => {
    //     const res = await getAllPosts();
    // }

	return (
        <div className="flex flex-col border shadow-sm /*border-t-0*/ gap-5 justify-center p-5 bg-white px-10">
            <div className="">
                <textarea 
                    className="w-full h-[100px] border-2 border-app p-3 px-4 rounded"
                    placeholder="Post Something..."
                    onChange={e => setPost({...post, caption: e.target.value})}
                />
            </div>
            <div className="flex justify-between gap-5 text-app text-lg">
                <div className="flex gap-5">
                    <div className="">
                        <label htmlFor="image-input">
                            <div className="flex items-center gap-2 p-2">
                                <div><IoImageSharp className="text-2xl"/></div>
                                <p>Attach Image</p>
                            </div>
                        </label>
                        <input
                            type="file" accept="image/*"
                            // onChange={e => setPost({...post, image: e.target.value})}
                            // onChange={e => setSelectedImage(e.target.value)}
                            onChange={handleSelectImage}
                            className="hidden"
                            id="image-input"
                        />
                    </div>
                    <div>
                        <label htmlFor="video-input">
                            <div className="flex items-center gap-2 p-2">
                                <div><FaVideo className="text-2xl"/></div>
                                <p>Attach Video</p>
                            </div>
                        </label>
                        <input
                            type="file" accept="video/*"
                            // onChange={e => setPost({...post, video: e.target.value})}
                            onChange={handleSelectVideo}
                            className="hidden"
                            id="video-input"
                        />
                    </div>
                </div>
                <button onClick={handlePost} className="flex items-center gap-2 border text-white bg-app rounded-3xl h-fit p-2 px-3">
                    <p>Post</p>
                    <div><IoSend className="text-xl"/></div>
                </button>
            </div>
            {
                selectedImage &&
                <div>
                    <img
                        src={selectedImage}
                        className="h-[200px]"
                    />
                </div>
            }
            {
                selectedVideo &&
                <div>
                    <video
                        src={selectedVideo}
                        className="h-[200px]"
                    />
                </div>
            }
        </div>
    );
}

export default CreatePost;
