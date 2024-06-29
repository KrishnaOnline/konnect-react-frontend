import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { IoChatbubblesSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/userApis";


function Sidebar({setIsSidebarOpen}) {
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);
    const userId = user?.id;
    const navigate = useNavigate();
    const dispatch = useDispatch();

	return (
        <div className="text-black w-[350px] text-[20px] ml-10 lg:ml-10 pt-5 sticky top-0 h-screen">
            <div onClick={() => setIsSidebarOpen(false)} className="nav-items w-fit flex flex-col gap-5">
                <NavLink to={"/"}>
                    <div className="flex items-center gap-5">
                        <GoHomeFill className="text-3xl"/>
                        <p>Home</p>
                    </div>
                </NavLink>
                <NavLink to={"/reels"}>
                    <div className="flex items-center gap-5">
                        <MdExplore className="text-3xl"/>
                        <p>Kwiks</p>
                    </div>
                </NavLink>
                {/* <NavLink to={"/create-reels"}>
                    <div className="flex items-center gap-5">
                        <IoMdAddCircle className="text-3xl"/>
                        <p>Create Reels</p>
                    </div>
                </NavLink> */}
                <NavLink to={"/chat"}>
                    <div className="flex items-center gap-5">
                        <IoChatbubblesSharp className="text-3xl"/>
                        <p>Messages</p>
                    </div>
                </NavLink>
                <NavLink to={`/profile/${userId}`}>
                    <div className="flex items-center gap-5">
                        <FaUser className="text-3xl"/>
                        <p>Profile</p>
                    </div>
                </NavLink>
                <NavLink to={`/profile/edit/${userId}`}>
                    <div className="flex items-center gap-5">
                        <IoMdSettings className="text-3xl"/>
                        <p>Settings</p>
                    </div>
                </NavLink>
                <NavLink to={"https://krishnavamshi-portfolio.netlify.app/"} target="_blank">
                    <div className="flex items-center gap-5">
                        <FaInfoCircle className="text-3xl"/>
                        <p>About</p>
                    </div>
                </NavLink>
                <div onClick={() => dispatch(logout(navigate))} className="cursor-pointer flex items-center gap-5 text-red-500">
                    <RiLogoutBoxLine className="text-3xl"/>
                    <p>Logout</p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
