import { useEffect, useState } from "react";
import { getUserPosts } from "../../services/operations/postApis";
import { FcLike } from "react-icons/fc";

function UserTextPosts({userId}) {
    const [posts ,setPosts] = useState([]);
    const fetchAllPosts = async () => {
        const res = await getUserPosts(userId);
        setPosts(res.reverse());
        console.log(res);
    }
    useEffect(() => {
        fetchAllPosts();
    }, [])

	return (
        <div className="flex flex-wrap items-center justify-center gap-3">
            {
                posts?.map(p => 
                    (!p?.image && !p?.video) &&
                    <div key={p?.id} className="relative shadow-lg p-5 w-[200px] h-[100px] overflow-scroll border">
                        <div>
                            {p?.caption}
                        </div>
                        <div className="translate-y-4 translate-x-0 text-black absolute z-10 flex items-center gap-1">
                            <p>{p?.liked.length}</p>
                            <FcLike className="text-xl"/>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default UserTextPosts;
