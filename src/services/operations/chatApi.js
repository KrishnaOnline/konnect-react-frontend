import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { chatApi, messagesApi } from "../apis"

export const createChat = async (otherUserId, token) => {
    try {
        const response = await apiConnector("POST", chatApi.CREATE_CHAT, {userId: otherUserId}, {
            'Authorization': `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        // toast.error(err.response.data.message);
        console.log(err.response.data.message);
    }
}

export const getUserChats = async (token) => {
    try {
        const response = await apiConnector("GET", chatApi.FIND_USER_CHATS, null, {
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

// export const createMessage = async (chatId, reqData, token) => {
//     try {
//         const response = await apiConnector("POST", messagesApi.CREATE_MESSAGE+chatId, reqData.content, {
//             'Authorization': `Bearer ${token}`
//         });
//         console.log(response.data);
//         reqData.sendMessageToServer(response.data);
//         if(response.data.error) {
//             throw new Error(response.data.message);
//         }
//         return response.data;
//     } catch(err) {
//         console.log(err.response.data.message);
//     }
// }

export const createMessage = async (chatId, reqData, token) => {
    try {
        const response = await apiConnector("POST", messagesApi.CREATE_MESSAGE+chatId, reqData.content, {
            'Authorization': `Bearer ${token}`
        });
        console.log(response.data);
        reqData.sendMessageToServer(response.data);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data;
    } catch(err) {
        console.log(err.response.data.message);
    }
}

export const getChatMessages = async (chatId, token) => {
    try {
        const response = await apiConnector("GET", messagesApi.GET_MESSAGES_FROM_CHAT+chatId, null, {
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