import React  from "react";

export const themes = {
    dark : {
        color : "white",
        background : "#082032"
    },
    light : {
        color : "black",
        backdround : "white"
    }
}

const ThemeContext = React.createContext(themes.light);

export default ThemeContext;