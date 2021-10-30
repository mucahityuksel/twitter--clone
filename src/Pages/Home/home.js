import React, { useState,useEffect,useContext } from 'react'
import {Button} from "../../stories/Button"
import HomeLeftSide from './homeLeftSide'
import img from "./user.png"
import {IoImageOutline} from "react-icons/all"
import Tweets from './tweets'
import { v4 } from 'uuid';
import axios from 'axios'
import UserList from './userList'
import {useTranslation,} from "react-i18next"
import ThemeContext, { themes } from '../../context/ThemeContext'


function Home() {
  const {t,i18n} = useTranslation();
  const data = localStorage.getItem("users");
  const user = JSON.parse(data);
  const theme = useContext(ThemeContext);
  const [tweet,setTweet] = useState({
    username : user.username,
    id : null,
    text : null,
    like : {
      isLiked : false,
      likeCount : 0,
      users :[]
    },
    retweet : {
      isReTweet : false,
      reTweetCount : 0,
      users :[]
    },
    comment : [
      {
        id : null,
        username : null,
        text : null
      }
      
    ],
    followers : [{
      count : 0
    }],
  });
  const [users, setUsers] = useState([]);


  useEffect(()=> {
    axios.get("https://twitter-server-mucahit.herokuapp.com/users")
      .then((data) =>{
        const result = data.data;
        setUsers(result);
      })
      .catch((err) => console.log(err));
  },[]);

  const getTweet = (e) => {
    e.preventDefault();
    setTweet({
      username : user.username,
      id : v4(),
      text : e.target.value,
      like : {
        isLiked : false,
        likeCount : 0,
        users :[]
      },
      retweet : {
        isReTweet : false,
        reTweetCount : 0,
        users :[]
    },
    comment : [
      {
        id : null,
        username : null,
        text : null
      }
      
    ],
    following : user.following
    });  
  }

  const sendTweet = () => {
    setTweet({
      username : user.usernmae,
      id : tweet.id,
      text : tweet.text,
      like : {
        isLiked : false,
        likeCount : 0,
        users :[]
      },
      retweet : {
        isReTweet : false,
        reTweetCount : 0,
        users :[]
    },
    });

    const data = users.find((data,key) =>{ 
      if(data.id === user.id){
        user.tweets.push(tweet);       
        localStorage.setItem("users",JSON.stringify(user));
        axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${data.id}`,user)
        .then(res => console.log(res))       
    }
    user.followers.map((item,key) => {
      if(item === data.id){
       data.f_tweets.push(tweet);
       
       axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${data.id}`,data)
        .then(res => console.log(res))
      }
    })
  
  });

    
  }
  return (
    
    <div className="home-page"  >        
        <HomeLeftSide></HomeLeftSide>
           
        <div className="home-center-side">
          <div className="center-header">
            <h3 className="home-header-text">{t("Home")}</h3>
          </div>
          <div className="center-tweet">
            { <div className="tweet-bar">
              <img alt="hi"src={img} className="user"></img>
              <textarea  placeholder={t("textarea.placeholder.What's happening?")}  onChange={getTweet}></textarea>
              <br></br>
              <div>
                <Button  label="tweet" size="small" onClick={sendTweet}></Button>
                <IoImageOutline size="2em" className="gallery"></IoImageOutline>               
              </div>
            </div>}
          </div>
          <div className="center-tweet-list"><Tweets></Tweets></div>
        </div>
        <div className="home-right-side">
        <UserList  ></UserList>
        </div>
    </div>
    
  )
}

export default Home