import React ,{useState,useEffect}from 'react'
import { Input } from '../../stories/Input'
import UserList from './userList';
import axios from 'axios';
import {useTranslation} from "react-i18next"
function SearchUser() {
    const [searchUser, setSearchUser] = useState("");
    const [selected,setSelected] = useState({});
    const [users,setUsers] = useState([]);
    const {t,i18n} = useTranslation();

    useEffect(()=>{
      axios.get("https://twitter-server-mucahit.herokuapp.com/users")
        .then((data) => {
          const result = data.data;
          setUsers(result);
        });
      
    },[]);


      const handleChange = (e) => {
          e.preventDefault();
          setSearchUser(e.target.value);
          users.forEach((item)=>{
              if(item.username === searchUser){
                  setSelected(item);
                
              }
          })
      }

    

   
  return (
    <div>
        <Input size="large" placeholder={t("search-input.placeholder.search..")} onChange={handleChange}></Input>    
        <UserList></UserList>    
    </div>
  )
}

export default SearchUser
