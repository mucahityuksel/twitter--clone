import React,{useContext, useState} from 'react';
import {FaTwitter,GiBirdHouse,AiOutlineClose,MdTag,IoIosNotificationsOutline,MdOutlineEmail,FiBookmark,RiFileList2Line,HiOutlineUser,MdDarkMode} from "react-icons/all"
import { Button } from '../../stories/Button';
import {useHistory} from "react-router-dom";
import Modal from "react-modal"
import TweetModal from '../../Modal/tweetModal';
import {useTranslation, withTranslation} from "react-i18next"
import ThemeContext,{themes} from '../../context/ThemeContext';

function HomeLeftSide() {
    
    const {t,i18n} = useTranslation();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const history = useHistory();
    const data = localStorage.getItem("users");
    const user = JSON.parse(data);
    
    const {theme, toggleTheme} = useContext(ThemeContext);
    const signout = () => {
        localStorage.clear();
        history.push({pathname:"/"});
    }
    
    const handleChangeLanguage = (lang) => {
        i18n.changeLanguage(lang);
      };
    const select = (user) => {
        history.push(
            {pathname :`/profile/${user.id}`,
            state : user
        }
        );
    }
    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
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
      
    <div className="home-left-side" >
        <div className="left-list" >
            <FaTwitter color="#1ea7fd" size="2em" className="home-icon"></FaTwitter>
            <div className="left-item">
                <GiBirdHouse className="home-icon" size ="2em" onClick={()=> {
                    history.push({pathname:"/home"})
                }}></GiBirdHouse>
                <label className="left-item-label">{t("Home")}</label>
            </div>
            <div className="left-item">
                <MdTag className="home-icon" size="2em"  fontWeight="10px"></MdTag>
                <label className="left-item-label">{t("Explore")}</label>
            </div>
            <div className="left-item">
                <IoIosNotificationsOutline className="home-icon" size="2em" ></IoIosNotificationsOutline>
                <label className="left-item-label">{t("Notifications")}</label>
            </div>
            <div className="left-item">
                <MdOutlineEmail className="home-icon" size="2em"></MdOutlineEmail>
                <label className="left-item-label">{t("Messages")}</label>
            </div>
            <div className="left-item">
                <FiBookmark className="home-icon" size="2em"></FiBookmark>
                <label className="left-item-label">{t("Bookmarks")}</label>
            </div>
            <div className="left-item">
                <RiFileList2Line className="home-icon" size="2em"></RiFileList2Line>
                <label className="left-item-label">{t("Lists")}</label>
            </div>
            <div className="left-item" >
                <HiOutlineUser className="home-icon" size="2em" onClick={()=> {select(user)}}></HiOutlineUser>
                <label className="left-item-label" >{t("Profile")}</label>
            </div>
            <div className="left-item">
                <MdDarkMode className="home-icon" size="2em" onClick={
                    toggleTheme
                    }></MdDarkMode>
                <label className="left-item-label">{t("Theme")}</label>
            </div>
            <div className="left-item">
                <label onClick={()=> {
                    handleChangeLanguage("tr");
                }}> Turkish </label>
                <label onClick={()=> {
                    handleChangeLanguage("en");
                }}> English </label>
            </div>
            <div className="left-item">
                <Button size="large" label="Tweet" onClick={openModal}></Button>
                <Modal
                  isOpen={modalIsOpen}
                  contentLabel="Hello"
                  onRequestClose={closeModal}
                  ariaHideApp={false}
                  contentLabel="Selected Option"
                  style={customStyles}
                > 
                  <div className="Modal-Header">
                  <AiOutlineClose onClick={closeModal} className="close"></AiOutlineClose>
                  </div>
                  <TweetModal></TweetModal>
                </Modal>
                <Button size="large" label={t("Sign Out")} onClick={signout}></Button>
            </div>
        </div>
    </div>
    
  )
}

export default withTranslation()(HomeLeftSide);
