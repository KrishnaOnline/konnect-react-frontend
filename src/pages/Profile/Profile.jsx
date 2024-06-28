import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineSettings } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import UserPosts from "../../components/Profile/UserPosts";
import UserReels from "../../components/Profile/UserReels";
import UserSaved from "../../components/Profile/UserSaved";
import { followUnfollowUser, getUser, getUserByToken } from "../../services/operations/userApis";
import { getUserPosts } from "../../services/operations/postApis";
import UserTextPosts from "../../components/Profile/UserTextPosts";

function Profile() {
    const {id} = useParams();
    const {token} = useSelector(state => state.auth);
    // const localUser = useSelector(state => state.profile.user);
    // console.log(token);
    const [userPosts, setUserPosts] = useState([]);
    const fetchUserPosts = async () => {
        const res = await getUserPosts(id);
        setUserPosts(res);
    }
    useEffect(() => {
        fetchUserPosts();
    }, [])
    const [activeTab, setActiveTab] = useState("Posts");
    const tabs = ["Texts", "Posts", "Kwiks"/*, "Saved"*/];
    const [user, setUser] = useState(null);
    const getUserById = async () => {
        if (!token) {
            console.error("Token not available");
            return;
        }
        const res = await getUser(id, token);
        console.log(res);
        if(res) {
            setUser(res);
        }
    };
    const [localUser, setLocalUser] = useState(null);
    const fetchUserByToken = async () => {
        const res = await getUserByToken(token);
        setLocalUser(res);
        console.log(res);
    }
    useEffect(() => {
        fetchUserByToken();
    }, [])

    const handleFollow = async (otherUserId) => {
        const res = await followUnfollowUser(otherUserId, token);
        getUserById();
        fetchUserByToken();
    }

    useEffect(() => {
        getUserById();
    }, [id, token])
    
	return (
        <div className="flex flex-col mx-auto lg:mx-0 w-[90%] justify-center items-center lg:w-[80%] mt-10">
            <div className="profile-details justify-center flex items-start gap-2 lg:gap-10">
                <img
                    className="rounded-full translate-y-2 lg:translate-x-0 h-24 lg:h-40"
                    // src="https://www.cinejosh.com/newsimg/newsmainimg/ram-charan_b_1101220947.jpg"   
                    src={user?.image}
                />
                <div className="flex pt-5 flex-col gap-5">
                    <div>
                        <p className="text-base lg:text-lg font-medium">{user?.firstName+" "+user?.lastName}</p>
                        <p className="text-gray-600 text-sm lg:text-base">{user?.email}</p>
                        <p className="message-box mt-3">{user?.bio}</p>
                    </div>
                    <div className="flex gap-5">
                        <p><span className="text-app">{userPosts.length}</span> Posts</p>
                        <p><span className="text-app">{user?.followers.length}</span> followers</p>
                        <p><span className="text-app">{user?.following.length}</span> following</p>
                    </div>
                </div>
                {
                    localUser?.id===user?.id
                    ?
                    <div className="">
                        <Link to={`/profile/edit/${id}`} className="mt-6 flex items-center gap-1 border p-2 rounded-lg bg-app text-white">
                            <MdOutlineSettings className="text-xl"/>
                            <p className="text-sm lg:text-base"> Edit Profile</p>
                        </Link>
                    </div>
                    :
                    <div className="pt-10 lg:pr-10 lg:-translate-x-5">
                        <button className="flex items-center gap-1 border p-2 px-3 rounded-lg bg-app text-white"
                            onClick={() => handleFollow(user?.id)}
                        >
                            {user?.followers?.some(u => u===localUser?.id) ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                }
            </div>
            <div className="h-[1px] bg-gray-300 mt-6"></div>
            <div className="posts-details">
                <div className="flex gap-10 items-center justify-center">
                    {
                        tabs.map((t, i) => {
                            return (
                                <div className="" key={i}>
                                    <div className={`h-[4px] ${activeTab===t ? "bg-app" : ""}`}></div>
                                    <button 
                                        className={`text-lg font-medium ${activeTab===t ? "text-app" : "text-black"}`}
                                        onClick={() => setActiveTab(t)}
                                    >{t}</button>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="mb-10 mt-10">
                    {activeTab==="Texts" && <UserTextPosts userId={id}/>}
                    {activeTab==="Posts" && <UserPosts userId={id}/>}
                    {activeTab==="Kwiks" && <UserReels userId={id}/>}
                    {activeTab==="Saved" && <UserSaved/>}
                </div>
            </div>
        </div>
    );
}

export default Profile;
