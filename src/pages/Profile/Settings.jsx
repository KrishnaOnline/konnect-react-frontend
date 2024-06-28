import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../services/operations/userApis";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { AvatarGenerator } from 'random-avatar-generator';

function Settings() {
    const {id} = useParams();
    const {token} = useSelector(state => state.auth);
    console.log(token);
    const [user, setUser] = useState(null);
    // const [updatedUser, setUpdatedUser] = useState({
    //     firstName: user?.firstName,
    //     lastName: user?.lastName,
    //     bio: user?.bio,
    //     // image: user?.image,
    // });
    const [updatedUser, setUpdatedUser] = useState(null);
    const getUserById = async () => {
        if (!token) {
            console.error("Token not available");
            return;
        }
        const res = await getUser(id, token);
        if(res) {
            setUser(res);
        }
    };
    const navigate = useNavigate();

    const handleUpdateUser = async () => {
        // if(user.firstName===updatedUser.firstName &&
        //    user.lastName===updatedUser.lastName &&
        //    user.bio===updatedUser.bio 
        //    && user.image===updatedUser.image
        // ) {
        //     toast.error("Nothing Changed");
        //     navigate("/");
        // } else {
            const response = await updateUser(updatedUser, token, navigate, id);
            console.log(response);
        // }
    }

    const avatarGen = new AvatarGenerator();
    const [avatar, setAvatar] = useState("");
    const handleAvatar = () => {
        const avt = avatarGen.generateRandomAvatar();
        setAvatar(avt);
        setUpdatedUser(prevUpdated => ({...prevUpdated, image: avt}));
    }

    useEffect(() => {
        getUserById();
        console.log(user);
    }, [id, token])

	return (
        <div>
            <div className="flex mx-auto w-[90%] lg:w-[80%] flex-col gap-10 mt-10 items-center justify-center">
                <div className="flex items-center text-lg gap-8">
                    <img
                        className="rounded-full h-24 lg:h-40"
                        // src={avatar || "https://www.cinejosh.com/newsimg/newsmainimg/ram-charan_b_1101220947.jpg"}
                        src={avatar || user?.image}
                    />
                    <button className="border-2 border-black p-2 bg-white rounded-lg text-[16px] text-black"
                        onClick={handleAvatar}
                    >
                        Generate Avatar
                    </button>
                </div>
                <div className="flex flex-col items-center gap-5 justify-center">
                    <div className="flex gap-5">
                        <label className="items-center gap-3">
                            <p className="pl-0 lg:text-lg">First Name: </p>
                            <input
                                className="w-[calc(50vw-20px)] lg:w-[250px] lg:text-lg border-2 border-app p-2"
                                defaultValue={user?.firstName}
                                onChange={e => setUpdatedUser({...updatedUser, firstName: e.target.value})}
                            />
                        </label>
                        <label className="items-center gap-3">
                            <p className="pl-0 lg:text-lg">Last Name: </p>
                            <input
                                className="w-[calc(50vw-20px)] lg:w-[250px] lg:text-lg border-2 border-app p-2"
                                defaultValue={user?.lastName}
                                onChange={e => setUpdatedUser({...updatedUser, lastName: e.target.value})}
                            />
                        </label>
                    </div>
                    <label className="items-start m-3 gap-3">
                        <p className="pl-0 text-lg">Description/Bio: </p>
                        <textarea
                            className="w-[calc(100vw-20px)] lg:w-[520px] text-lg border-2 border-app p-2"
                            defaultValue={user?.bio}
                            onChange={e => setUpdatedUser({...updatedUser, bio: e.target.value})}
                        />
                    </label>
                </div>
                <button className="-translate-y-5 border p-2 bg-app rounded-lg text-lg text-white" onClick={handleUpdateUser}>
                    Update Profile
                </button>
            </div>
        </div>
    );
}

export default Settings;