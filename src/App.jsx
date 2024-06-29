import "./App.css";
import AuthN from "./pages/Auth/AuthN";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import HomePage from "./pages/Home/HomePage";
import OpenRoute from "./components/AuthRoutes/OpenRoute";
import Feed from "./components/Feed/Feed";
import Reels from "./components/Reels/Reels";
import Sidebar from "./components/Sidebar";
import CreateReels from "./components/Reels/CreateReels";
import PrivateRoute from "./components/AuthRoutes/PrivateRoute";
import Profile from "./pages/Profile/Profile";
import Error from "./pages/Error";
import Chat from "./pages/Chat/Chat";
import { useSelector } from "react-redux";
import Settings from "./pages/Profile/Settings";
import Search from "./components/Rightbar/Search";
import { IoMenuSharp } from "react-icons/io5";
import { useState } from "react";


function App() {
    const {token} = useSelector(state => state.auth);
    console.log(token);
    const currPath = useLocation().pathname;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="flex flex-col overflow-hidden justify-center /*max-w-[1366px]*/ mx-auto">
            <Navbar/>
            {token &&
            <div className="flex justify-between lg:hidden mx-1 mt-5">
                <div className="ml-2">
                    {
                        currPath!=="/chat" &&
                        <div className="flex lg:hidden flex-col bg-white">
                            <button className="z-50 mt-0 bg-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                <IoMenuSharp className="text-5xl"/>
                            </button>
                            <div className={`${isSidebarOpen ? "flex" : "hidden"} absolute z-40 bg-white shadow-lg /*w-1/5*/ h-screen w-[350px] pt-10 /*border border-r-0 border-t-0*/`}>
                                <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
                            </div>
                        </div>
                    }
                </div>
                <div className="mr-5">
                    {currPath!=="/chat" && <Search/>}
                </div>
            </div>}
            {/* <div className="h-[1px] bg-gray-300"></div> */}
            {/* <AuthN/> */}
            <Routes>
                <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
                <Route path="/login/guest" element={<OpenRoute><Login/></OpenRoute>}/>
                <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
                <Route path="/home" element={<HomePage/>}/>
                {/* <Route path="/" element={<HomePage/>}/> */}
                {/* {!token && <Route path="/" element={<Feed/>}/>} */}
                <Route element={<PrivateRoute><HomePage/></PrivateRoute>}>
                    <Route path="/" element={<Feed/>}/>
                    <Route path="/reels" element={<PrivateRoute><Reels/></PrivateRoute>}/>
                    <Route path="/create-reels" element={<PrivateRoute><CreateReels/></PrivateRoute>}/>
                    <Route path="/profile/:id" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                    <Route path="/profile/edit/:id" element={<PrivateRoute><Settings/></PrivateRoute>}/>
                    <Route path="/chat" element={<Chat/>}/>
                </Route>
                <Route path="*" element={<Error/>}/>
            </Routes>
		</div>
	);
}

export default App;
