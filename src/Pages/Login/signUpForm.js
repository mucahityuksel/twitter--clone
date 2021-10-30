import React, {useEffect, useState} from 'react'
import { Button } from '../../stories/Button'
import { Input } from '../../stories/Input'
import {useDispatch} from "react-redux"
import  {SIGNUP}  from '../../redux/actions/user';
import {v4 as uuidv4, v4} from "uuid";
import {useHistory} from "react-router-dom";
import axios from "axios"
import {useTranslation, withTranslation} from "react-i18next"
function SignUpForm() {

  const [user,setUser] = useState({
    id: v4(),
    firstName : "",
    lastName : "",
    username : "",
    password : "",
    email : "",
    date : "",
    tweets : [    
      {
          
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
    comments : [],
    followers : [
      {
       count : 0,
       
      },
      
    ],
    following : [
      
    ],
    f_tweets : [],
    
  });
  const [users,setUsers] = useState([]);

  const {t,i18n} = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(()=> {
    axios.get("https://twitter-server-mucahit.herokuapp.com/users")
      .then((data) =>{
        const result = data.data;
        setUsers(result);
      })
      .catch((err) => console.log(err));
  },[]);

  const handleChange = (e) => {
    setUser({...user,[e.target.id] : e.target.value})
  }

  const SignUp = () => {
    const kayit = users.find(data => data.username === user.username);
    
    if(kayit){
      alert("bu kullanıcı zaten var");
    }else{
      localStorage.setItem("users",JSON.stringify(user));
      dispatch({type: SIGNUP, payload : user});
      history.push({pathname : "/home"})
    }
    
    
  }


  return (
    
    <div className="modal-body">
        <div>
        <Input name="First Name" id ="firstName" onChange={handleChange}></Input>
        <Input name="Last Name" id = "lastName" onChange={handleChange}></Input>
        </div>
        <div>
        <Input name="Email" id="email" type="email" onChange={handleChange}></Input>
        <Input name="Username" id="username" onChange={handleChange}></Input>
        </div>
        <div>
        <Input name="Password" id="password"type="password" onChange={handleChange}></Input>
        <Input name="Confirm Password" id="password" type="password" onChange={handleChange}></Input>
        </div>
        <div>
        <Input type="date"  id = "date" name="Birth Date" onChange={handleChange}></Input>
        </div>
        <br></br>
        <Button size="large"label={t("Sign Up")} onClick={SignUp}></Button>
    </div>
    
  )
}

export default SignUpForm
