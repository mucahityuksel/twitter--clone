import './App.css';
import Home from "./Pages/Home/home"
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useContext, useState } from 'react';
import Login from './Pages/Login/login';
import Profile from './Pages/Profile/profile';
import FProfile from './Pages/Profile/f_profile';
import { I18nextProvider } from 'react-i18next';
import ThemeContext,{themes} from './context/ThemeContext';
import i18n from './i18next';
import {MdDarkMode} from "react-icons/all"
function App() {
  
  const [theme,setTheme] = useState(themes.light);
  
   const toggleTheme = () => {
    theme === themes.dark ? setTheme(theme.light) : setTheme(themes.dark);
  }
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
      <div className="App" style={theme}>
     
      <I18nextProvider i18n={i18n}>
      <Router>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/profile/:id" ><Profile></Profile> </Route>
          <Route path="/f_profile/:id" ><FProfile></FProfile> </Route>
        </Switch>
      </Router>
      </I18nextProvider>
     
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
