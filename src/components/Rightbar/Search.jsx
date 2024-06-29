import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { searchUsers } from "../../services/operations/userApis";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Search() {
    const {token} = useSelector(state => state.auth);
    const [searchQ, setSearchQ] = useState("");
    const [users, setUsers] = useState([]);
    const [searchResultsBox, setSearchResultsBox] = useState(false);
    const searchResultsRef = useRef(null); // Ref for the search results box
    const handleSearchUsers = async () => {
        if (searchQ === "") {
            toast.error("Enter String to search");
            return;
        }
        const res = await searchUsers(searchQ, token);
        setUsers(res);
        if(!res.length) toast.error("No Users Found");
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

	return (
        <div className="chat-sidebar w-[350px] mb-5">
            <div className="search-users w-full relative">
                <div className="flex w-[350px] justify-center border border-gray-300 rounded-2xl items-center">
                    <input
                        className="p-2 px-3 text-lg rounded-2xl rounded-r-none w-5/6"
                        placeholder="Search Users..."
                        onChange={(e) => setSearchQ(e.target.value)}
                    />
                    <button
                        className="border p-2 px-3 w-2/6 text-lg bg-app bg-opacity-95 rounded-2xl rounded-l-none text-white"
                        onClick={handleSearchUsers}
                    >
                        Search
                    </button>
                </div>
                {searchResultsBox && (
                    <div ref={searchResultsRef} className="flex flex-col gap-2 z-50 absolute bg-white shadow-lg">
                        {users &&
                            users.map((u) => (
                                <Link to={`/profile/${u?.id}`}
                                    key={u?.id}
                                    className="cursor-pointer"
                                    onClick={() => {
                                        setSearchResultsBox(false); // Close search results on selection
                                    }}
                                >
                                    <div className="flex border-b-2 w-[350px] p-2 group hover:bg-app gap-5 items-center justify-start">
                                        <img
                                            className="h-16"
                                            src={u?.image}
                                        />
                                        <div>
                                            <p className="text-lg group-hover:text-white">{u?.firstName}</p>
                                            <p className="text-gray-500 text-sm group-hover:text-white">{u?.email}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
