import { useEffect, useState } from "react";
import { getAllPosts, getUserPosts } from "../../services/operations/postApis";
import { FcLike } from "react-icons/fc";

function UserPosts({userId}) {
    const [posts ,setPosts] = useState([]);
    const fetchAllPosts = async () => {
        const res = await getUserPosts(userId);
        setPosts(res.reverse());
        console.log(res);
    }
    useEffect(() => {
        fetchAllPosts();
    }, [])

    // const postUrl = "https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
	return (
        <div className="mt-5 flex flex-wrap gap-1 items-center justify-center">
            {
                posts.map((p, i) => {
                    return (
                        p?.image && 
                        <div className="relative" key={i}>
                            <img
                                className="relative h-[400px] w-[300px] object-fill /*w-[250px]*/ rounded-lg hover:shadow-2xl cursor-pointer hover:scale-105 transition-all duration-300"
                                src={p?.image}
                                onClick={() => {
                                    window.open(p?.image, '_blank')
                                }}
                            />
                            <div className="-translate-y-10 translate-x-5 text-white absolute z-10 flex items-center gap-1">
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

export default UserPosts;
