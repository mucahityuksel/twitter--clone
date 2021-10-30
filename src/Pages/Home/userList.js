import React,{useEffect,useState} from 'react'
import { Button } from '../../stories/Button'
import { Input } from '../../stories/Input';
import axios from 'axios';
import {store} from "../../redux/store"
import img from "./user.png"
import {useTranslation} from "react-i18next"


function UserList() {
  const [users,setUsers] = useState([]);
  const data = localStorage.getItem("users");
  const loginUser = JSON.parse(data);



  const [newUser,setNewUser] = useState([])
  const {t} = useTranslation();

  useEffect(()=>{
    //console.log("değişti");
    axios.get("https://twitter-server-mucahit.herokuapp.com/users")
      .then((data) => {
        const result = data.data;
        setUsers(result);
        setNewUser(result);
      });
  },[]);

  const handleChange = (e) => {
 
    users.find((item)=>{
        if(item.username === e.target.value){
            setUsers([item]);
            console.log(item)
        }
        if(e.target.value === ""){
          setUsers(newUser)
        }
    })
    
}
  const follow = async (user) => {
;
    store.getState().user.user.following.push(user.id);
    loginUser.following.push(user.username)
    
    axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
             .then(res => console.log(res));
    localStorage.setItem("users",JSON.stringify(loginUser));
    let a = store.getState().user.user.following

    users.map((item,key) => {
      if(item.id === store.getState().user.user.following[a.length - 1]){
        store.getState().user.user.f_tweets.push(item.tweets);
        item.followers[0].count = item.followers[0].count + 1;
        item.followers.push(loginUser.id)
        item.tweets.map((data) => {                   
          loginUser.f_tweets.push(data)       
          localStorage.setItem("users",JSON.stringify(loginUser));         
        })       
        axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${loginUser.id}`,loginUser)
             .then(res => console.log(res));
             axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${item.id}`,item)
             .then(res => console.log(res));
      }
    })      
    
  }
  const unfollow = async (user) => {

    let a = store.getState().user.user.following
    user.followers[0].count = user.followers[0].count - 1;
    loginUser.following.pop(loginUser.following[user.username])
    axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${user.id}`,user)
      .then(res => console.log(res));      
          
    users.map((item) => {
      if(item.username === user.username){
        
        store.getState().user.user.f_tweets.pop(item.tweets);
        item.followers[0].count = item.followers[0].count -1;
        item.followers.pop(loginUser.id)
        item.tweets.map((data) => {                   
          loginUser.f_tweets.pop(data) 
          //loginUser.following.pop(loginUser.following[user.username])      
          localStorage.setItem("users",JSON.stringify(loginUser));         
        }) 
        axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${item.id}`,item)
        .then(res => console.log(res));     
         axios.put(`https://twitter-server-mucahit.herokuapp.com/users/${loginUser.id}`,loginUser)
             .then(res => console.log(res));
      } 
   })
  }

  return (
    <div>
      <Input size="large" placeholder="search.."  onChange={handleChange}></Input>
      {         
         users.map((user,key) => {
           if(user.username !== loginUser.username){
            
             return <div className="userlist">
             <div>
           <img src={img} className="user"></img>
            <div className="userlist-item">
                  {user.username}
                </div>                 
                    <div onClick={()=> {                  
                      user.username  !== loginUser.following[key]? follow(user) : unfollow(user)
                    }}>                    
                      {                       
                      user.username  !== loginUser.following[key-1]  ?  
                      <Button size="small" label={t("follow")}></Button> : <Button size="small" label={t("unfollow")} ></Button>}
                    </div>             
              </div>
            </div>
           }
         })
     
      }
    </div>
  )
}

export default UserList
