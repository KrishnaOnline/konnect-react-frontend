import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {z} from "zod";
import { login } from "../../services/operations/userApis";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const currPath = useLocation().pathname;
    console.log(currPath);

    const LoginSchema = z.object({
        email: z.string().min(5, {message: "Username must be atleast 5 chars"}).refine(s => !s.includes(' '), 'Username must not contain Spaces'),
        password: z.string().min(5, {message: "Password must be atleast 5 chars"})
    });

    const handleSubmit = async () => {
        const res = LoginSchema.safeParse(data);
        if(!res.success) {
            const formattedErrors = res.error.format();
            const [firstField, errorObject] = Object.entries(formattedErrors).find(
                ([, value]) => value._errors && value._errors.length > 0
            ) || [];
            if(firstField) {
                toast.error(`${errorObject._errors[0]}`);
            }
        } else {
            setLoading(true);
            const toastId = toast.loading("Logging In...");
            console.log(res);
            const response = dispatch(login(data, navigate));
            setLoading(false);
            toast.dismiss(toastId);
            console.log(response);
        }
    }

    const handleGuestLogin = async () => {
        setLoading(true);
        const toastId = toast.loading("Logging In...");
        const response = dispatch(login({
            email: "test01",
            password: "guestuser"
        }, navigate));
        setLoading(false);
        toast.dismiss(toastId);
        console.log(response);
    }

	return (
        <div className="flex -translate-y-10 md:translate-y-0 items-center justify-center h-screen">
            <div className="-translate-y-[60px] md:translate-y-0">
                <p className="mb-1 font-bold text-[45px] text-center text-app">Login</p>
                <div className="flex flex-col gap-4 shadow-lg border rounded-3xl p-5">
                    <label>
                        <p className="ml-1 text-lg">Username</p>
                        <input
                            className="border border-black rounded p-2 w-[300px]"
                            placeholder="Enter your Username"
                            onChange={e => setData({...data, email: e.target.value})}
                        />
                    </label>
                    <label>
                        <p className="ml-1 text-lg">Password</p>
                        <input
                            type="password"
                            className="border border-black rounded p-2 w-[300px]"
                            placeholder="Enter your Password"
                            onChange={e => setData({...data, password: e.target.value})}
                        />
                    </label>
                    <button 
                        className={`${loading ? "bg-opacity-75" : ""} border mt-1 p-2 rounded-xl bg-app text-white font-medium text-lg`}
                        onClick={handleSubmit}
                        disabled={loading}
                    >{loading ? "Logging In..." : "Login"}</button>
                    {
                        currPath==="/login/guest" &&
                        <div>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-3/5 h-[2px] bg-gray-300"></div>
                                <p>OR</p>
                                <div className="w-3/5 h-[2px] bg-gray-300"></div>
                            </div>
                            <button 
                                className={`w-full ${loading ? "bg-opacity-75" : ""} border mt-4 p-2 rounded-xl bg-app text-white font-medium text-lg`}
                                onClick={handleGuestLogin}
                                disabled={loading}
                            >{loading ? "Logging In..." : "Guest Login"}</button>
                        </div>
                    }
                </div>
                <div className="mt-6 text-center">
                    <p>Not Registered Yet?, <Link to={"/signup"} className="text-blue-600 underline"> SignUp</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
