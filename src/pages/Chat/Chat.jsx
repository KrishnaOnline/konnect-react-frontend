import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { useEffect, useState, useRef } from "react"; // Added useRef for detecting clicks outside
import { searchUsers } from "../../services/operations/userApis";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { createChat, getUserChats } from "../../services/operations/chatApi";
import ChatBox from "./ChatBox";
import { FiMenu } from "react-icons/fi";

function Chat() {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [searchQ, setSearchQ] = useState("");
    const [searchResultsBox, setSearchResultsBox] = useState(false);
    const [users, setUsers] = useState([]);
    const [otherUserId, setOtherUserId] = useState(null);
    const [chat, setChat] = useState(null);
    const [userChats, setUserChats] = useState([]);

    const searchResultsRef = useRef(null); // Ref for the search results box

    const handleCreateChat = async (otherId) => {
        setOtherUserId(otherId);
        const res = await createChat(otherId, token);
        setChat(res);
        console.log(res);
    };

    const fetchUserChats = async () => {
        const res = await getUserChats(token);
        setUserChats(res);
        console.log(res);
    };

    useEffect(() => {
        fetchUserChats();
    }, []);

    const handleSearchUsers = async () => {
        if (searchQ === "") {
            toast.error("Enter String to search");
            return;
        }
        const res = await searchUsers(searchQ, token);
        setUsers(res);
        setSearchResultsBox(true); // Show search results when searching
        console.log(users);
    };

    useEffect(() => {
        // Function to close search results when clicking outside
        function handleClickOutside(event) {
            if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
                setSearchResultsBox(false);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Unbind the event listener on cleanup
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [isChatSidebarOpen, setIsChatSidebarOpen] = useState(false);

    return (
        <div className="relative flex h-screen flex-col lg:flex-row mx-auto gap-5">
            <button
                className="lg:hidden z-40 p-2 text-black"
                onClick={() => setIsChatSidebarOpen(!isChatSidebarOpen)}
            >
                <FiMenu className="text-[40px]" />
            </button>
            <div
                className={`chat-sidebar w-[350px] items-center flex flex-col pt-5 p-3 bg-white ${
                    isChatSidebarOpen ? "translate-x-0 absolute z-30 h-full" : "hidden lg:flex"
                } lg:relative lg:block`}
            >
                <NavLink to={"/"} className="flex items-center gap-2 my-5 text-app">
                    <GoHomeFill className="text-3xl" />
                    <p className="text-2xl font-semibold">Go Home</p>
                </NavLink>
                <div className="search-users relative">
                    <div className="flex justify-center border-app border-2 rounded items-center">
                        <input
                            className="p-1 text-lg rounded"
                            placeholder="Search Users..."
                            onChange={(e) => setSearchQ(e.target.value)}
                        />
                        <button
                            className="border p-1 text-lg bg-app px-2 text-white"
                            onClick={handleSearchUsers}
                        >
                            Search
                        </button>
                    </div>
                    {searchResultsBox && (
                        <div ref={searchResultsRef} className="flex flex-col gap-2 z-50 absolute bg-white shadow-lg">
                            {users &&
                                users.map((u) => (
                                    <div
                                        key={u?.id}
                                        className="cursor-pointer"
                                        onClick={() => {
                                            handleCreateChat(u?.id);
                                            setSearchResultsBox(false); // Close search results on selection
                                        }}
                                    >
                                        <div className="flex border-b-2 w-[315px] p-2 group hover:bg-app gap-5 items-center justify-start">
                                            <img
                                                className="h-16"
                                                src={u?.image}
                                            />
                                            <div>
                                                <p className="text-lg group-hover:text-white">{u?.firstName}</p>
                                                <p className="text-gray-500 text-sm group-hover:text-white">{u?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    {userChats.map((c) =>
                        c?.users?.map((u) =>
                            user.id !== u.id && (
                                <div
                                    className="w-[315px] cursor-pointer group border rounded shadow-md p-2 hover:bg-app"
                                    key={u?.id}
                                    onClick={() => {
                                        handleCreateChat(u?.id);
                                        setIsChatSidebarOpen(false);
                                    }}
                                >
                                    <div className="flex gap-5 items-center justify-start">
                                        <img
                                            className="h-16"
                                            src={u?.image}
                                        />
                                        <div>
                                            <p className="text-lg group-hover:text-white">{u?.firstName}</p>
                                            <p className="text-gray-500 text-sm group-hover:text-white">{u?.email}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    )}
                </div>
            </div>
            {isChatSidebarOpen && (
                <div
                    className="fixed bg-black z-40 lg:hidden"
                    onClick={() => setIsChatSidebarOpen(false)}
                ></div>
            )}
            <div className="flex mx-auto w-screen">
                {chat 
                    ? <ChatBox chat={chat} chatId={chat?.id} /> 
                    : <div className="mx-auto flex flex-col items-center justify-center">
                          <p className="text-3xl mb-5">No Chat Selected</p>
                          <div className="flex lg:hidden flex-col gap-2">
                              {userChats.map((c) =>
                                  c?.users?.map((u) =>
                                      user.id !== u.id && (
                                          <div
                                              className="w-[315px] cursor-pointer group border rounded shadow-md p-2 hover:bg-app"
                                              key={u?.id}
                                              onClick={() => {
                                                  handleCreateChat(u?.id);
                                                  setIsChatSidebarOpen(false)
                                              }}
                                          >
                                              <div className="flex gap-5 items-center justify-start">
                                                  <img
                                                      className="h-16"
                                                      src={u?.image}
                                                  />
                                                  <div>
                                                      <p className="text-lg group-hover:text-white">{u?.firstName}</p>
                                                      <p className="text-gray-500 text-sm group-hover:text-white">{u?.email}</p>
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  )
                              )}
                          </div>
                      </div>}
            </div>
        </div>
    );
}

export default Chat;