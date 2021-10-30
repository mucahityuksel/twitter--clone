import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import { AiOutlineHeart, FaRegComment, FaRetweet} from "react-icons/all"
import img from "../Home/user.png"
import HomeLeftSide from '../Home/homeLeftSide'
import { Button } from '../../stories/Button'
import UserList from '../Home/userList'
function FProfile() {

    const location = useLocation();
    
    const user = location.state;
    useEffect(()=>{
        console.log(location);
    },[]);

  return (
    <div className="home-page">
      <HomeLeftSide></HomeLeftSide>
      <div className="home-center-side">
        <div className="center-header">
            <h3 className="home-header-text">Profile</h3>
        </div>
        <div className="center-tweet1">
             <div className="back-img">
                <div >
                    <img alt="hi"src={img} className="user"></img>         
                </div>                
            </div>
            <div className="edit">
                <Button label="unfollow" size="small"></Button>
            </div>
            <div className="edit-bar">
                    <div className="info">
                        <label className="username">{user.firstName}</label>
                        <label className="username1">@{user.username}</label>
                    </div> 
                    {                      
                            <div className="follow-bar">
                                <label className="following_label">{user.following.length} Following </label>
                                {/* <label className="followers_label">{user.followers[0].count} Followers </label>                             */}
                            </div>                       
                    }    
                </div>
        </div>
        <div className="center-tweet-list">
            <div className="tweet-div-bar">
                {
                     location.state.tweets.map((tweet,key)=> 
                     <div>
                     {
                       tweet.text !== "" && 
                       <div key={key} className="tweet-div">
                         <img src={img} className="user"></img>
                         <div className="t">
                           <label>@{user.username} </label>
                           <label className="tweet-control">{tweet.text}</label>
                         </div>
                         <div className="icons-bar">
                           <FaRegComment className="comment"></FaRegComment>
                           <div
                           className="like">
                                <FaRetweet className="retweet" ></FaRetweet>
                             </div>
                           
                           <div className="like">
                             <div className="like"><AiOutlineHeart></AiOutlineHeart >{tweet.like.likeCount}</div>
                           </div>
                         </div>
                       </div>
                     }
                   </div>
                     )
                }
            </div>
        </div>
        
      </div>
      <div className="home-right-side">
        <UserList></UserList>
        </div>
    </div>
    )
  
}

export default FProfile
