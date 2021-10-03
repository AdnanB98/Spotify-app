import React from "react";

import './button.css';

const LoginButton = (props) => {
    return (
        <button className="loginButton" onClick={props.onClick}>{props.title}</button>
    );
}

export default LoginButton