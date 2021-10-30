import React, { useEffect, useState } from 'react'
import img from "./user.png"
import { AiOutlineHeart, FaRegComment, FaRetweet, FcLike} from "react-icons/all"
import axios from 'axios'
import {useHistory} from "react-router-dom";
import { store } from '../../redux/store';


function Tweets() {
  const [isLiked, setIsLiked] = useState(false);
  const [retweet, setReTweet] = useState(false);
  const data = localStorage.getItem("users");
  const newUser = store.getState().user.user.f_tweets;
  const user = JSON.parse(data);
  const [users,setUsers] = useState([]);
  const history = useHistory();
  const [selectedUser, setSelectedUser] = useState({});

  useEffect(()=>{
    axios.get("https://twitter-server-mucahit.herokuapp.com/users")
      .then((data) => {
        const result = data.data;
        setUsers(result);
      });
    console.log(newUser);

  },[data]);

  const showProfile = (user) => {
    setSelectedUser(user);
    users.map((item) => {
      if(item.username === user){
        history.push({
          pathname : `/f_profile/${item.id}`,
          state : item
        })
      }
    })
    
  }
  //for followings tweet
  const Like1 =async (tweet1) => {
    user.likes.push(tweet1)
     user.f_tweets.map((data) => {
       if(data.id === tweet1.id){
         data.like.isLiked = true;        
         data.like.likeCount = data.like.likeCount + 1 ;
         data.like.users.push(user.username);
         users.map((x) =>{ //for followings tweets like update
          x.tweets.map((y)=>{
            y.like.users.push(user.username);
            y.like.likeCount = y.like.likeCount + 1
      
             axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${x.id}`,x)
            .then(res => console.log(res));
          })
        })
         localStorage.setItem("users",JSON.stringify(user))
         axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
             .then(res => console.log(res));
       }
     })
     const data = users.map((user1)=> { //tweets pushing loginUsers likes
      user.likes.push(tweet1)
      localStorage.setItem("users",JSON.stringify(user))
       user1.tweets.find(data => {
         if(data.id === tweet1.id){
           data.like.isLiked = true;   
           data.like.likeCount = data.like.likeCount + 1 ;  
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user1.id}`,user1)
             .then(res => console.log(res));

         }})
   });

   
  }
  //for login user tweets
  const Like = (tweet1) => {
    user.likes.push(tweet1)
     user.tweets.map((data) => {
       if(data.id === tweet1.id){
         data.like.isLiked = true;        
         data.like.likeCount = data.like.likeCount + 1 ;
         localStorage.setItem("users",JSON.stringify(user))
       }
     })
     const data = users.map((user1)=> {
      user.likes.push(tweet1)
      localStorage.setItem("users",JSON.stringify(user))
       user1.tweets.find(data => {
         if(data.id === tweet1.id){
           data.like.isLiked = true;   
           data.like.likeCount = data.like.likeCount + 1 ;  
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user1.id}`,user)
             .then(res => console.log(res));

         }})
   });
  }
  const Dislike = (tweet1) => {

    user.tweets.map((data) => {
      if(data.id === tweet1.id){
        data.like.isLiked = false;
        data.like.likeCount = data.like.likeCount - 1 ;
        //data.like.users.pop(user)
        localStorage.setItem("users",JSON.stringify(user))
      }
    })

    const data = users.map((tweet)=> {
      tweet.tweets.find(data => {
        if(data.id === tweet1.id){
          data.like.isLiked = false;
          data.like.likeCount = data.like.likeCount - 1 ;
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${tweet.id}`,tweet)
            .then(res => console.log(res));
        }})
    });   
  }
  const Dislike1 = (tweet1) => {

    user.f_tweets.map((data) => {
      user.likes.pop(tweet1)
      if(data.id === tweet1.id){
        data.like.isLiked = false;
        data.like.likeCount = data.like.likeCount - 1 ;
        //data.like.users.pop(user)
        localStorage.setItem("users",JSON.stringify(user))
        axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
        .then(res => console.log(res));
      }
    })

    const data = users.map((tweet)=> {
      tweet.tweets.find(data => {
        if(data.id === tweet1.id){
          data.like.isLiked = false;
          data.like.likeCount = data.like.likeCount - 1 ;
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${tweet.id}`,tweet)
            .then(res => console.log(res));
        }})
    });   
  }
  const ReTweet1 = (tweet1) => {
    user.f_tweets.map((data) => {
      user.retweets.push(tweet1)
      if(data.id === tweet1.id){
        data.retweet.isReTweet = true;
        //data.retweet.users.push(user);
        data.retweet.retweetCount = data.retweet.retweetCount + 1 ;
        localStorage.setItem("users",JSON.stringify(user))
        axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
        .then(res => console.log(res));
      }
    })
    const data = users.map((user)=> {
      user.tweets.find(data => {
        if(data.id === tweet1.id){
          data.retweet.isReTweet = true;
          data.retweet.retweetCount = data.retweet.retweetCount + 1 ;
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
            .then(res => console.log(res));
        }})
    });
  }
  const ReTweet = (tweet1) => {
    user.tweets.map((data) => {
      if(data.id === tweet1.id){
        data.retweet.isReTweet = true;
        //data.retweet.users.push(user);
        localStorage.setItem("users",JSON.stringify(user))
      }
    })
    const data = users.map((user)=> {
      user.tweets.find(data => {
        if(data.id === tweet1.id){
          data.retweet.isReTweet = true;
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
            .then(res => console.log(res));
        }})
    });
  }
  const unReTweet = (tweet1) => {

    user.tweets.map((data) => {
      if(data.id === tweet1.id){
        data.retweet.isReTweet = false;
        data.retweet.users.pop(user)
        localStorage.setItem("users",JSON.stringify(user))
      }
    })

    const data = users.map((tweet)=> {
      tweet.tweets.find(data => {
        if(data.id === tweet1.id){
          data.retweet.isReTweet = false;
          //data.retweet.users.push(user)
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${tweet.id}`,tweet)
            .then(res => console.log(res));
        }})
    });   
  }
  const unReTweet1 = (tweet1) => {

    user.f_tweets.map((data) => {
      data.retweet.users.pop(user)
      if(data.id === tweet1.id){
        data.retweet.isReTweet = false;
        data.retweet.retweetCount = data.retweet.retweetCount - 1 ;
        localStorage.setItem("users",JSON.stringify(user))
        axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
        .then(res => console.log(res));
      
      }
    })

    const data = users.map((tweet)=> {
      tweet.tweets.find(data => {
        if(data.id === tweet1.id){
          data.retweet.isReTweet = false;
          data.retweet.retweetCount = data.retweet.retweetCount - 1 ;
          //data.retweet.users.push(user)
          axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${tweet.id}`,tweet)
            .then(res => console.log(res));
        }})
    });   
  }

  return (
    <>
      <div className="tweet-div-bar"> 
      {
         user.tweets.map((tweet,key)=> 
         <div>
         {
           tweet.text !== "" && 
           <div key={key} className="tweet-div">
             <img src={img} className="user" ></img>
             <div className="t" >
               <label onClick={()=>{
                 
                 console.log("gg")
                 history.push({
                   pathname : `/profile/${user.id}`,
                   state : user
                 })
               }} >@{user.username} </label>
               <label className="tweet-control">{tweet.text}</label>
             </div>
             <div className="icons-bar">
               <FaRegComment className="comment" ></FaRegComment>
               <div
               className="like"  onClick={()=>{
                 setReTweet(!retweet);
                 tweet.retweet.isReTweet === false  ? ReTweet(tweet) : unReTweet(tweet);
                 }}>
                   {tweet.retweet.isReTweet === false ? <FaRetweet className="retweet" ></FaRetweet>: <FaRetweet className="retweet" color="rgb(105, 190, 230)"></FaRetweet>}
                 </div>
               
               <div className="like"  onClick={()=>{
                 setIsLiked(!isLiked);
                 tweet.like.isLiked === false  ? Like(tweet) : Dislike(tweet);
                 }}>
                 {tweet.like.isLiked === false ? <div className="like"><AiOutlineHeart  ></AiOutlineHeart >{tweet.like.likeCount}</div> : <div className="like"><FcLike ></FcLike>{tweet.like.likeCount}</div>}
               </div>
             </div>
           </div>
         }
       </div>
         )
            
      }      
        {   
          
            user.f_tweets.map((tweet, key) =>
                <div>
                  {
                    tweet.text !== "" && 
                    <div key={key} className="tweet-div">
                      <img src={img} className="user"></img>
                      <div className="t">
                        <label onClick={()=>{
                          
                          showProfile(tweet.username)
                        
                      }}>@{tweet.username} </label>
                        <label className="tweet-control">{tweet.text}</label>
                      </div>
                      <div className="icons-bar">
                        <FaRegComment className="comment" ></FaRegComment>             
                        <div
                        className="like"  onClick={()=>{
                          tweet.retweet.isReTweet === false  ? ReTweet1(tweet) : unReTweet1(tweet);
                          }}>
                            {  
                            tweet.retweet.isReTweet === false ? <FaRetweet className="retweet" ></FaRetweet>: <FaRetweet className="retweet" color="rgb(105, 190, 230)"></FaRetweet>}
                          </div>                       
                        <div className="like"  onClick={()=>{
                          tweet.like.isLiked === false ? Like1(tweet) : Dislike1(tweet);
                          }}>
                          {tweet.like.isLiked === false ? <div className="like"><AiOutlineHeart  ></AiOutlineHeart >{tweet.like.likeCount}</div> : <div className="like"><FcLike ></FcLike>{tweet.like.likeCount}</div>}
                        </div>
                      </div>
                    </div>
                  }
                </div>
            )
            
        }
      </div>
    </>
  )
}

export default Tweets
