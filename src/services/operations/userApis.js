import toast from "react-hot-toast";
import { apiConnector, AUTH_HEADER } from "../apiConnector"
import { userApi } from "../apis";
import { setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/profileSlice";
import { useSelector } from "react-redux";


export const signUp = async (data, navigate) => {
    try {
        const response = await apiConnector("POST", userApi.SIGNUP_API, data);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.success("Signup Successful");
        navigate("/login");
    } catch(err) {
        toast.error(err.response.data.message);
        console.log(err);
        navigate("/signup");
    }
}

export const login = (data, navigate) => {
    return async(dispatch) => {
        try {
            const response = await apiConnector("POST", userApi.LOGIN_API, data);
            if(response.data.error) {
                throw new Error(response.data.message);
            }
            toast.success("Logged In Successfully");
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));
            navigate("/");
        } catch(err) {
            console.log(err);
            toast.error(err.response.data.message);
            toast.error(err.message);
            navigate("/login");
        }
    }
}

export const logout = (navigate) => {
    return async(dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        toast.success("Logged Out");
        navigate("/login");
        localStorage.clear();
    }
}

export const getAllUsers = async (token) => {
    try {
        const response = await apiConnector("GET", userApi.GET_ALL_USERS, null, {
            'Authorization': `Bearer ${token}`
            // AUTH_HEADER: `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        toast.error(err.response.data.message);
        console.log(err);
    }
}

export const getUser = async (userId, token) => {
    try {
        const response = await apiConnector("GET", userApi.GET_USER_BY_ID+userId, null, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
    }
}

export const getUserByToken = async (token) => {
    try {
        const response = await apiConnector("GET", userApi.GET_USER_BY_TOKEN, null, {
            'Authorization': `Bearer ${token}`
        })
        if(response.data.error) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err.response.data.message);
    }
}

export const updateUser = async (data, token, navigate, id) => {
    try {
        const response = await apiConnector("PUT", userApi.UPDATE_USER, data, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.success("Profile Updated Successfully");
        navigate("/profile/"+id);
    } catch(err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
    }
}

export const searchUsers = async (query, token) => {
    try {
        const response = await apiConnector("GET", userApi.SEARCH_USERS+query, null, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err.response.data.message);
    } 
}

export const followUnfollowUser = async (otherUserId, token) => {
    try {
        const response = await apiConnector("PUT", userApi.FOLLOW_UNFOLLOW_USER+otherUserId, null, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        // toast.success("Following User");
        return response.data;
    } catch(err) {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
    }
}