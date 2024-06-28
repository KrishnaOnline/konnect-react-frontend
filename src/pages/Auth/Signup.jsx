import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import {z} from "zod";
import { signUp } from "../../services/operations/userApis";
import { AvatarGenerator } from 'random-avatar-generator';


function Signup() {
    const navigate = useNavigate();
	const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);

    const SignupSchema = z.object({
        firstName: z.string().min(1, {message: "First Name is Required"}).max(10, {message: "Maximum of 10 chars for FirstName"}),
        lastName: z.string().min(1, {message: "Last Name is Required"}).max(10, {message: "Maximum of 10 chars for FirstName"}),
        email: z.string().min(5, {message: "Username must be atleast 5 chars"}).max(10, {message: "Username must be atmost 10 chars"}).refine(s => !s.includes(' '), 'Username must not contain Spaces'),
        password: z.string().min(5, {message: "Password must be atleast 5 chars"})
    });
    
    const avatarGen = new AvatarGenerator();
    const handleSubmit = async () => {
        const res = SignupSchema.safeParse(data);
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
            console.log(res);
            // setData(prev => ({...prev, image: avatarGen.generateRandomAvatar()}));
            // console.log(data);
            await setData(data.image = avatarGen.generateRandomAvatar());
            console.log(data);
            const response = await signUp(data, navigate);
            setLoading(false);
            console.log(response);
        }
    }

	return (
        <div className="flex -translate-y-10 items-center justify-center h-screen">
            <div className="-translate-y-[60px]">
                <p className="mb-1 font-bold text-[45px] text-center text-app">Sign Up</p>
                <div className="flex flex-col gap-4 shadow-lg border rounded-3xl p-5">
                    <label>
                        <p className="ml-1 text-lg">First Name</p>
                        <input
                            className="border border-black rounded p-2 w-[300px]"
                            placeholder="Enter your First Name"
                            onChange={e => setData({...data, firstName: e.target.value})}
                        />
                    </label>
                    <label>
                        <p className="ml-1 text-lg">Last Name</p>
                        <input
                            className="border border-black rounded p-2 w-[300px]"
                            placeholder="Enter your Last Name"
                            onChange={e => setData({...data, lastName: e.target.value})}
                        />
                    </label>
                    <label>
                        <p className="ml-1 text-lg">Username or Email</p>
                        <input
                            className="border border-black rounded p-2 w-[300px]"
                            placeholder="Enter your Registered Email"
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
                    >{loading ? "Signing Up..." : "Sign Up"}</button>
                </div>
                <div className="mt-6 text-center">
                    <p>Already Registered?, <Link to={"/login"} className="text-blue-600 underline"> Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;