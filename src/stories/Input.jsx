import React from "react";
import PropTypes from "prop-types"
import "./input.css"

export const Input = ({value,onChange,type,name, ...props}) => {
  
    return(
        <input className={`twitter-input-${value}`}
            type={type}
            onChange={onChange}
            placeholder = {name}
            {...props}
        >
            
        </input>
    )
}



Input.propTypes = {
    value : PropTypes.oneOf(["form","tweet"]),
    onChange : PropTypes.func,
    type : PropTypes.string,
    name : PropTypes.string
}

Input.defaultProps = {
    value : "form",
    type : "text",
    
}