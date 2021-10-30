import React, { useState, useEffect} from 'react'
import { Button } from '../../stories/Button'
import { FaTwitter,AiOutlineClose } from 'react-icons/all';
import img from "../twitter.jpg"
import Modal from "react-modal"
import SignUpForm from './signUpForm';
import { Input } from '../../stories/Input';
import { LOGIN, login } from '../../redux/actions/user';
import {useDispatch} from "react-redux"
import {useHistory } from "react-router-dom";
import axios from 'axios';
import {useTranslation, withTranslation} from "react-i18next"

function Login() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {t,i18n} = useTranslation();
  const [loginUser,setLoginUser] = useState({
    username : "",
    password : "",
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

  const dispatch = useDispatch();
  const history = useHistory();

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }
  const handleChange = (e) => {
    e.preventDefault();
    setLoginUser({username: e.target.value});
  }


  const LogIn = () => {
    console.log(loginUser.username);
    const kayit = users.find(data => data.username === loginUser.username);
    
    if(kayit){
      localStorage.setItem("users",JSON.stringify(kayit))
      dispatch({type: LOGIN, payload : kayit});
     
      history.push({pathname : "/home"})
    }else{
      alert("kullanıcı adı,şifre veya kayıtlı değil");
    }

  }
  const customStyles = {
    content :{
      top : "50%",
      left: '50%',
      right: 'auto',     
      bottom: 'auto',
      marginRight: '-50%',
      border :"none",

      transform: 'translate(-50%, -50%)',
    }
  }
  
  return (
    <>
      <div className="container">
        <div className="left-side">
          <img src={img} alt="twiiter icon"></img>
        </div>
        <div className="right-side">
          <div className="login-page">
            <div className="Login">
              <div className="login-inputs">
                <FaTwitter color="#1ea7fd" size="3em" className="twitter-icon"></FaTwitter>
                <Input className="twitter-input-form" id="username" onChange={handleChange} name="username"></Input>
                <Input className="twitter-input-form"   name="password" type="password"></Input>
                <Button  size="small" label={t("Log In")} onClick={LogIn}></Button>
              </div>
              <div className="login-body">          
                <FaTwitter color="#1ea7fd" size="3em" className="twitter-icon"></FaTwitter>
                <h2>{t("See what's happening in the world right now")}</h2>
                <label>{t("Join twitter today.")}</label>
                
                <Button size="large" label={t("Sign Up")} onClick={openModal}></Button>
                <Modal
                  isOpen={modalIsOpen}
                  contentLabel="Hello"
                  onRequestClose={closeModal}
                  ariaHideApp={false}
                  contentLabel="Selected Option"
                  style={customStyles}
                > 
                  <div className="Modal-Header">
                  <FaTwitter color="#1ea7fd" size="2em" className="twitter-icon-1"></FaTwitter>
                  <AiOutlineClose onClick={closeModal} className="close"></AiOutlineClose>
                  </div>
                  <SignUpForm></SignUpForm>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
