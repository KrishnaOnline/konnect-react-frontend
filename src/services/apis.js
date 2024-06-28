const BASE_URL = import.meta.env.VITE_BASE_URL;
console.log(BASE_URL);

export const userApi = {
    SIGNUP_API: BASE_URL+"/signup",
    LOGIN_API: BASE_URL+"/login",
    GET_ALL_USERS: BASE_URL+"/auth/users",
    GET_USER_BY_ID: BASE_URL+"/auth/users/", // +userId
    UPDATE_USER: BASE_URL+"/auth/users",
    DELETE_USER: BASE_URL+"/auth/users",                                  // ---
    FOLLOW_UNFOLLOW_USER: BASE_URL+"/auth/users/follow/", // +userId
    SEARCH_USERS: BASE_URL+"/auth/users/search?query=", // +query
    GET_USER_BY_TOKEN: BASE_URL+"/auth/users/profile",
}

export const postsApi = {
    CREATE_POST: BASE_URL+"/auth/posts",
    GET_ALL_POSTS: BASE_URL+"/posts",
    LIKE_UNLIKE_POST: BASE_URL+"/auth/posts/like/",  // +postId
    GET_POST_BY_ID: BASE_URL+"/posts/",   // +postId                     // ---
    GET_USERS_POSTS: BASE_URL+"/posts/user/",   // +userId
    SAVE_POST: BASE_URL+"/auth/posts/save/",   // +postId                // ---
    DELETE_POST: BASE_URL+"/auth/posts/",   // +postId                   // ---
}

export const commentsApi = {
    CREATE_COMMENT: BASE_URL+"/auth/comments/post/",  // +postId
    LIKE_COMMENT: BASE_URL+"/auth/comments/like/",    // +postId         // ---
}

export const reelsApi = {
    CREATE_REEL: BASE_URL+"/auth/reels",                                 // ---
    GET_ALL_REELS: BASE_URL+"/auth/reels",                               // ---
    GET_USER_REELS: BASE_URL+"/auth/reels/user/",   // +userId           // ---
}

export const chatApi = {
    CREATE_CHAT: BASE_URL+"/auth/chats",
    FIND_USER_CHATS: BASE_URL+"/auth/chats",
}

export const messagesApi = {
    CREATE_MESSAGE: BASE_URL+"/auth/messages/chat/",   // +chatId
    GET_MESSAGES_FROM_CHAT: BASE_URL+"/auth/messages/chat/",  // +chatId
}