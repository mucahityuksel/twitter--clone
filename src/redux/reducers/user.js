import { SIGNUP, TWEET, LIKE, DISLIKE, LOGIN} from "../actions/user";
import {v4 as uuidv4, v4} from "uuid";
import axios from "axios"
const userState = {
    
    user : {
        id: v4(),
        firstName : "",
        lastName : "",
        username : "",
        password : "",
        email : "",
        date : "",
        tweets : [    
            {
                username : "",
                id : v4(),
                text : "",
                like : {
                    isLiked : false,
                    likeCount : 0,
                    users :[]
                },
                retweet : {
                    isReTweet : false,
                    reTweetCount : 0,
                    users :[]
                }
            }
        ],
        likes : [
            { 
                id : v4(),
                text : "",
            }
        ],
        retweets : [],
        comments : [
            {
                id : null,
                text : null,
                username : null,
            }
        ],
        followers : [
            {
                count : 0,
                
            }
        ],
        following : [],
        f_tweets : [],
    }
    
};


const userReducer = (state = userState, action) => {
    switch (action.type) {
        case SIGNUP:
            axios.post("https://twitter-server-mucahit.herokuapp.com/users",action.payload).then((data) => console.log(data));
            return{
                ...state,
                user: action.payload,
                
            };
            
        case TWEET:
            return{
                ...state,
                
                user :  action.payload,
                
            }
            case LOGIN:
                return{
                    ...state,
                    
                    user :  action.payload,
                    
                }
        case LIKE:
            return {
                ...state,
                [state.user.tweets] : state.user.tweets.map((data,i) =>{                  
                    if(i === action.payload){
                        data.like = true;
                    }
                })
                //user : action.payload,
            }   
        case DISLIKE:
            return {
                ...state,
                [state.user.tweets] : state.user.tweets.map((data,i) =>{                  
                    if(i === action.payload){
                        data.like = false;
                    }
                })
            }    
        default:
            return state;
    }
}

export default userReducer;