export const SIGNUP = "signup";
export const LOGIN = "login";
export const LOGOUT = "logout";
export const TWEET = "tweet";
export const LIKE = "like";
export const DISLIKE = "dislike";

export const signUp = (payload) => {
    console.log(payload);
    return {
        type : SIGNUP,
        ...payload,
    };
    
};

export const login = (payload) => {
    console.log(payload)
    return{
        type : LOGIN,
        ...payload,
    };
};

export const logOut = (payload) => {
    return{
        type : LOGOUT,
        ...payload,
    };
};

export const addNewTweet = (payload) => {
    console.log(payload);
    return{
        type : TWEET,
        ...payload,
    }
}