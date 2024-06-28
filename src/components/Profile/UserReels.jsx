import {useEffect, useRef, useState} from "react";
import { getAllPosts, getUserPosts } from "../../services/operations/postApis";
import { FcLike } from "react-icons/fc";


function UserReels({userId}) {
    const [reels, setReels] = useState([]);
    const fetchAllPosts = async () => {
        const res = await getUserPosts(userId);
        setReels(res.reverse());
        console.log(res);
    }
    useEffect(() => {
        fetchAllPosts();
    }, [])

	return (
        <div className="mt-5 flex flex-wrap gap-1 items-center justify-center">
            {
                reels?.map((p, i) => {
                    // const videoRef = useRef(null);
                    // const handleMouseEnter = () => {
                    //     videoRef.current.play();
                    // }
                    // const handleMouseLeave = () => {
                    //     videoRef.current.pause();
                    // }
                    // const handleVideoEnd = () => {
                    //     videoRef.current.currentTime = 0;
                    //     videoRef.current.play();
                    // }
                    return (
                        p?.video &&
                        <div key={i}>
                            <video 
                                // ref={videoRef}
                                autoPlay
                                controls
                                className="h-[400px] w-[300px] object-fill /*w-[250px]*/ rounded-lg hover:shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                                src={p?.video}
                                // onMouseEnter={handleMouseEnter}
                                // onMouseLeave={handleMouseLeave}
                                // onEnded={handleVideoEnd}
                                onClick={() => {
                                    window.open(p?.video, '_blank')
                                }}
                            />
                            <div className="-translate-y-24 translate-x-5 text-white absolute z-10 flex items-center gap-1">
                                <p>{p?.liked.length}</p>
                                <FcLike className="text-2xl"/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default UserReels;
