import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../services/operations/userApis";
import { Link } from "react-router-dom";

function Suggestions() {
    const {token} = useSelector(state => state.auth);
    const {user} = useSelector(state => state.profile);
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const res = await getAllUsers(token);
        setUsers(res);
        console.log(res);
    }

    useEffect(() => {
        getUsers();
    }, [])

	return (
        <div>
            <div className="p-2 mt-3">
                <p className="mb-3 text-xl font-medium">Suggested for you</p>
                {
                    users.map((u) =>  (
                        u?.id!==user?.id &&
                        <Link to={`/profile/${u?.id}`} key={u?.id} className="border-b-2 profile-details flex items-center justify-around">
                            <div className="flex gap-5 my-2 items-center">
                                <img 
                                    className="rounded h-14"
                                    // src="https://img.freepik.com/premium-vector/young-smiling-man-avatar-man-with-brown-beard-mustache-hair-wearing-yellow-sweater-sweatshirt-3d-vector-people-character-illustration-cartoon-minimal-style_365941-860.jpg"
                                    src={u?.image ? u?.image : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1717632000&semt=ais_user"}
                                />
                                <div>
                                    <p className="text-lg">{u?.firstName}</p>
                                    <p className="text-gray-500 text-sm">@{u?.email}</p>
                                </div>
                            </div>
                            <button
                                className="p-1 rounded-2xl px-2 text-white"
                            ></button>
                        </Link>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default Suggestions;
