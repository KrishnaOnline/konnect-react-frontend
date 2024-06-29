import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import PrivateRoute from "../../components/AuthRoutes/PrivateRoute";
import Reels from "../../components/Reels/Reels";
import CreateReels from "../../components/Reels/CreateReels";
import Profile from "../Profile/Profile";
import Feed from "../../components/Feed/Feed";
import Rightbar from "../../components/Rightbar/Rightbar";
import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";


function HomePage() {
    const currPath = useLocation().pathname;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
        <div className="flex justify-between gap-5 min-h-screen">
            {
                currPath!=="/chat" &&
                <div className="/*w-1/5*/ hidden lg:flex w-[350px] pt-10 /*border border-r-0 border-t-0*/">
                    <Sidebar/>
                </div>
            }
            {/* <div className="w-[1px] bg-gray-300"></div> */}
            <div className={`/*w-3/5*/ ${useLocation().pathname==="/" ? "w-[700px]" : "w-[100%]"}`}>
                <Outlet/>
            </div>
            {/* <Routes>
                <Route path="/" element={<Feed/>}/>
                <Route path="/reels" element={<PrivateRoute><Reels/></PrivateRoute>}/>
                <Route path="/create-reels" element={<PrivateRoute><CreateReels/></PrivateRoute>}/>
                <Route path="/profile/:id" element={<PrivateRoute><Profile/></PrivateRoute>}/>
            </Routes> */}
            {/* <div className="w-[1px] bg-gray-300"></div> */}
            {
                currPath==="/" && 
                <div className="/*w-1/5*/ hidden lg:flex w-[400px] mr-10 pt-10 /*border border-l-0 border-t-0*/">
                    <Rightbar/>
                </div>
            }
        </div>
    );
}

export default HomePage;