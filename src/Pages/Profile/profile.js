import React from 'react'
import { Button } from '../../stories/Button';
import { AiOutlineHeart, FaRegComment, FaRetweet} from "react-icons/all"
import HomeLeftSide from '../Home/homeLeftSide'
import img from "../Home/user.png"
import UserList from '../Home/userList'
import {useTranslation, withTranslation} from "react-i18next"
function Profile() {

    const data = localStorage.getItem("users");
    const user = JSON.parse(data);
    const {t,i18n} = useTranslation();
  return (
    <div className="home-page">
      <HomeLeftSide></HomeLeftSide>
      <div className="home-center-side">
        <div className="center-header">
            <h3 className="home-header-text">{t("Profile")}</h3>
        </div>
        <div className="center-tweet1">
             <div className="back-img">
                <div >
                    <img alt="hi"src={img} className="user"></img>         
                </div>                
            </div>
            <div className="edit">
                <Button label={t("Edit Profile")}></Button>
            </div>
            <div className="edit-bar">
                    <div className="info">
                        <label className="username">{user.firstName} {user.lastName}</label>
                        <label className="username1">@{user.username}</label>
                    </div> 
                    {                      
                            <div className="follow-bar">
                                <label>{user.following.length} {t("Following")} </label>
                                {/* <label>{user.followers[0].count} {t("Followers")} </label>                             */}
                            </div>                       
                    }    
                </div>
        </div>
        <div className="center-tweet-list">
            <div className="tweet-div-bar">
                {
                     user.tweets.map((tweet,key)=> 
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
                             <div className="like"><AiOutlineHeart  ></AiOutlineHeart >{tweet.like.likeCount}</div>
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

export default Profile
