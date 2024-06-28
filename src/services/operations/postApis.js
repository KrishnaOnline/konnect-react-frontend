import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { commentsApi, postsApi } from "../apis"

export const createPost = async (data, token) => {
    try {
        const response = await apiConnector("POST", postsApi.CREATE_POST, data, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            toast.error(response.data.message);
            throw new Error(response.data.message);
        }
        toast.success("Posted Successfully");
        return response;
    } catch(err) {
        toast.error(err.response.data.message);
        console.log(err);
    }
}

export const getAllPosts = async () => {
    try {
        const response = await apiConnector("GET", postsApi.GET_ALL_POSTS, null, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err.response.data.message);
    }
}

export const likeUnlikePost = async (postId, token) => {
    try {
        const response = await apiConnector("PUT", postsApi.LIKE_UNLIKE_POST+postId, null, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
    } catch(err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
    }
}

export const commentPost = async (data, postId, token) => {
    try {
        const response = await apiConnector("POST", commentsApi.CREATE_COMMENT+postId, data, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.success("Comment Added to the Post");
    } catch(err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const response = await apiConnector("GET", postsApi.GET_USERS_POSTS+userId, null, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err.response.data.message);
    }
}

export const getPostById = async (postId) => {
    try {
        const response = await apiConnector("GET", postsApi.GET_POST_BY_ID+postId, null, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err.response.data.message);
    }
}