import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/operations/postApis";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight} from "react-icons/fa6";


function Reels() {
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0); // Track current index of posts array

    const fetchAllPosts = async () => {
        const res = await getAllPosts();
        setPosts(res.filter(p => p?.video).reverse()); // Filter posts to include only those with video content
        console.log(res);
    };

    useEffect(() => {
        fetchAllPosts();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === posts.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? posts.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative -translate-y-16">
            <button onClick={handlePrev} className="absolute left-5 top-1/2 -translate-x-3 -translate-y-12 lg:transform lg:-translate-y-1/2">
                <FaArrowLeft className="text-6xl text-black"/>
            </button>
            <button onClick={handleNext} className="absolute right-5 top-1/2 translate-x-3 -translate-y-12 lg:transform lg:-translate-y-1/2">
                <FaArrowRight className="text-6xl text-black"/>
            </button>
            <div className="flex items-center justify-center h-screen">
                {posts.length > 0 && (
                    <div className="p-5 rounded" key={posts[currentIndex]?.id}>
                        <video
                            controls
                            autoPlay
                            className="h-[500px] w-[350px] object-fill rounded-3xl"
                            src={posts[currentIndex]?.video}
                        />
                        <Link className="mt-2 flex justify-center items-center gap-3" to={`/profile/${posts[currentIndex]?.user?.id}`}>
                            <p className="text-xs">by</p>
                            <img
                                className="h-12"
                                src={posts[currentIndex]?.user?.image}
                            />
                            <p className="text-lg">{posts[currentIndex]?.user?.email}</p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Reels;
