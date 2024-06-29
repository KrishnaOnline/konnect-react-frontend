import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/Logo.png'
import {Link, useNavigate} from 'react-router-dom'
import { getUser, logout } from '../services/operations/userApis';
import { useEffect, useState } from 'react';

function Navbar() {
    // const {id} = useSelector(state => state?.profile?.user);
    const {token} = useSelector(state => state?.auth);
    // const token = localStorage.getItem("token");
    const id = JSON.parse(localStorage.getItem("user"))?.id;
    // const {user} = useSelector(state => state.profile);
    const [user, setUser] = useState(null);
    console.log(token);
    console.log(user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const getUserById = async () => {
        if (!token) {
            console.log("Token not available");
            return;
        }
        const res = await getUser(id, token);
        if(res) {
            setUser(res);
        }
    };
    useEffect(() => {
        getUserById();
        console.log(user);
    }, [id, token])
    const handleLogout = () => {
        dispatch(logout(navigate));
    }

	return (
        <div className={`p-2 px-3 fixed w-full top-0 z-50 bg-white`}>
            <div className="flex bg-white justify-between items-center p-1 px-2 z-100 sticky w-full h-[70px] top-0">
                <Link className='sticky top-0 flex items-end' to={"/" /*"https://www.linkedin.com/in/krishna-vamshi-kusuma-11717b213/"*/} /*target='_blank'*/>
                    <img className="h-14" src={Logo}/>
                    <p className='text-3xl text-[#002456] hidden md:flex font-semibold'>onnect</p>
                </Link>
                {
                    token
                    ?
                    <div className='flex items-center gap-5'>
                        <Link to={`/profile/${user?.id}`} className='flex gap-2 items-center'>
                            <img
                                className='h-12'
                                src={user?.image}
                            />
                            <p className='text-xl hidden lg:flex'><span className='text-app'>{user?.firstName}!</span></p>
                        </Link>
                        <button className='text-xl text-red-800 font-semibold border-2 p-2 border-red-800 rounded-xl hover:bg-red-800 hover:text-white' onClick={handleLogout}>Logout</button>
                    </div>
                    :
                    <div className="flex gap-3">
                        <Link to={"/signup"} className="border border-black p-2 rounded">SignUp</Link>
                        <Link to={"/login"} className="border border-black p-2 rounded">Login</Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;
