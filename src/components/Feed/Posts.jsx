import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { commentPost, getAllPosts, getPostById, likeUnlikePost } from "../../services/operations/postApis";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Posts() {
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const [posts, setPosts] = useState([]);
    const [openComments, setOpenComments] = useState([]);
    const [commentData, setCommentData] = useState({ content: "" });

    const getPosts = async () => {
        const res = await getAllPosts();
        // setPosts(res);
        setPosts(res.reverse());
    }
    useEffect(() => {
        getPosts();
    }, []);

    const toggleComment = (index) => {
        const newOpenComments = [...openComments];
        newOpenComments[index] = !newOpenComments[index];
        setOpenComments(newOpenComments);
    };

    const handleLikeUnlike = async (postId, index) => {
        try {
            await likeUnlikePost(postId, token);
            const updatedPost = await getPostById(postId);
            setPosts(posts.map((post, i) => (i===index ? updatedPost : post)));
        } catch(err) {
            toast.error("Error liking the Post");
        }
    }

    const commentHandler = async (postId, index) => {
        try {
            await commentPost(commentData, postId, token);
            const updatedPost = await getPostById(postId);
            setPosts(posts.map((post, i) => (i===index ? updatedPost : post)));
        } catch(err) {
            toast.error("Error commenting on the Post");
        }
    }

    return (
        <div className="flex flex-col gap-5 w-full">
            {
                posts.map((p, i) => (
                    <div key={p?.id} className="w-full">
                        <div className="border rounded-lg px-6 p-3">
                            <Link to={`/profile/${p?.user?.id}`} className="profile-details flex mb-3 items-center gap-2">
                                <img
                                    className="rounded h-12"
                                    src={p?.user?.image}
                                />
                                <div>
                                    <p className="">{p?.user?.firstName + " " + p?.user?.lastName}</p>
                                    <p className="text-gray-500 text-sm">{p?.user?.email}</p>
                                </div>
                            </Link>
                            <div className="flex flex-col">
                                {
                                    p?.image &&
                                    <img
                                        className="h-[500px] rounded-3xl"
                                        src={p?.image}
                                    />
                                }
                                {
                                    p?.video &&
                                    <video
                                        controls 
                                        autoPlay
                                        className="h-[500px] object-fill rounded-3xl"
                                        src={p?.video}
                                    />
                                }
                                <p className="text-lg pl-3 mt-3">{p?.caption}</p>
                                <div className="flex gap-3 flex-col">
                                    <div className="flex pl-2 mt-2 justify-between">
                                        <div className="flex gap-5">
                                            <button className="flex items-center gap-2" onClick={() => handleLikeUnlike(p?.id, i)}>
                                                {p?.liked && p?.liked.some(l => l.id===user.id) ? <FaHeart className="text-2xl text-red-500" /> : <FaRegHeart className="text-2xl text-red-500" />}
                                                <p className="text-base">{p?.liked.length} Likes</p>
                                            </button>
                                            <button className="flex items-center gap-2" onClick={() => toggleComment(i)}>
                                                <FaRegComment className="text-2xl text-app" />
                                                <p className="text-base">{p?.comments.length} Comments</p>
                                            </button>
                                        </div>
                                        <button>Save</button>
                                    </div>
                                    <div className={`flex ${openComments[i] ? "" : "hidden"} border-2 border-app mx-6`}>
                                        <input
                                            className="w-5/6 p-2"
                                            placeholder="Comment Here..."
                                            onChange={e => setCommentData({ content: e.target.value })}
                                        />
                                        <button
                                            className="w-1/6 text-lg bg-app text-white"
                                            onClick={() => commentHandler(p?.id, i)}
                                        >
                                            Send
                                        </button>
                                    </div>
                                    <div className={`flex flex-col gap-2 ml-5 max-h-[150px] overflow-scroll text-black ${!openComments[i] && "hidden"}`}>
                                        {
                                            p?.comments?.map((c) => (
                                                <Link to={`/profile/${c?.user?.id}`} className="flex items-center gap-2" key={c.id}>
                                                    <img
                                                        src={c?.user?.image}
                                                        className="h-10"
                                                    />
                                                    <p>{c?.content}</p>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Posts;


















// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// // import PostCard from "./PostCard";
// import { commentPost, getAllPosts, getPostById, likeUnlikePost } from "../../services/operations/postApis";
// // import { useSelector } from "react-redux";
// import { FcLike } from "react-icons/fc";
// import { FcLikePlaceholder } from "react-icons/fc";
// import { FaRegComment } from "react-icons/fa";
// import { BiLike } from "react-icons/bi";
// import { BiSolidLike } from "react-icons/bi";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";


// function Posts() {
//     const {token} = useSelector(state => state.auth);
//     const {user} = useSelector(state => state.profile);
//     const [posts, setPosts] = useState([]);
//     const [openComments, setOpenComments] = useState([]);
//     const [commentData, setCommentData] = useState({content: ""});
//     const getPosts = async () => {
//         const res = await getAllPosts();
//         setPosts(res);
//         console.log(posts);
//     }
//     const [post, setPost] = useState(null);
//     const fetchPostById = async (postId) => {
//         const res = await getPostById(postId);
//         setPost(res);
//     }
//     useEffect(() => {
//         getPosts();
//         console.log(posts);
//     }, [])
    
//     const toggleComment = (index) => {
//         const newOpenComments = [...openComments];
//         newOpenComments[index] = !newOpenComments[index];
//         setOpenComments(newOpenComments);
//     };
    
//     const handleLikeUnlike = async (postId) => {
//         try {
//             await likeUnlikePost(postId, token);
//             getPosts();
//             // fetchPostById(postId);
//         } catch(err) {
//             toast.error("Error liking the Post");
//         }
//     }
//     const commentHandler = async (postId) => {
//         await commentPost(commentData, postId, token);
//         getPosts();
//         // fetchPostById(postId);
//     }
    
// 	return (
//         <div className="flex flex-col gap-2 w-full">
//             {
//                 posts.map((p, i) => {
//                     return (
//                         <div key={p?.id} className="w-full">
//                             <div className="border px-6 p-3">
//                                 <Link to={`/profile/${p?.user?.id}`} className="profile-details flex mb-3 items-center gap-2">
//                                     <img 
//                                         className="rounded h-12"
//                                         // src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
//                                         src={p?.user?.image}
//                                     />
//                                     <div>
//                                         <p className="">{p?.user?.firstName+" "+p?.user?.lastName}</p>
//                                         <p className="text-gray-500 text-sm">{p?.user?.email}</p>
//                                     </div>
//                                 </Link>
//                                 <div className="flex flex-col">
//                                     {
//                                         p?.image &&
//                                         <img
//                                             className="h-[500px] rounded-3xl"
//                                             // src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
//                                             src={p?.image}
//                                         />
//                                     }
//                                     {
//                                         p?.video &&
//                                         <video
//                                             controls autoPlay
//                                             className="h-[500px] object-fill rounded-3xl"
//                                             // src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
//                                             src={p?.video}
//                                         />
//                                     }
//                                     <p>{p?.caption}</p>
//                                     <div className="flex gap-3 flex-col">
//                                         <div className="flex justify-between">
//                                             <div className="flex gap-5">
//                                             <button className="flex items-center gap-1" onClick={() => handleLikeUnlike(p?.id)}>
//                                                 {p?.liked && p?.liked.some(l => l.id === user.id) ? <FcLike className="text-[26px]" /> : <FcLikePlaceholder className="text-[26px]" />}
//                                                 <p className="text-lg">{p?.liked.length} Likes</p>
//                                             </button>
//                                                 <button className="flex items-center gap-1" onClick={() => toggleComment(i)}>
//                                                     <FaRegComment className="text-2xl text-app"/>
//                                                     <p>Comments</p>
//                                                 </button>    
//                                             </div>
//                                             <button>Save</button>
//                                         </div>
//                                         <div className={`flex ${openComments[i] ? "" : "hidden"} border border-app mx-6 rounded-2xl`}>
//                                             <input
//                                                 className="w-5/6 p-2"
//                                                 placeholder="Comment Here..."
//                                                 onChange={e => setCommentData({content: e.target.value})}
//                                             />
//                                             <button 
//                                                 className="w-1/6"
//                                                 onClick={() => commentHandler(p?.id)}
//                                             >
//                                                 Send
//                                             </button>
//                                         </div>
//                                         <div className={`max-h-[150px] text-black ${!openComments[i] && "hidden"}`}>
//                                             {
//                                                 p?.comments?.map((c) => (
//                                                     <div key={c.id}>
//                                                         {c?.content}
//                                                     </div>
//                                                 ))
//                                             }
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 })
//             }
//         </div>
//     );
// }

// export default Posts;