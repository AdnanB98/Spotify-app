import React from "react";

import styled from 'styled-components';

const Button = styled.button`
width: 25%;
border-width: 0cm;
border-radius: 100px;
background-color: #1DB954;
color: #FFFFFF;
text-align: center;
font-weight: bold;
padding: 17px 35px;
font-size: larger;
margin: 10pt;
`
const LoginButton = (props) => {
    return (
        <Button  onClick={props.onClick}>{props.title}</Button>
    );
}

export default LoginButton