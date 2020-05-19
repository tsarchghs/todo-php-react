import React from 'react';
import LoginContainer from "./Login.container";
import { Container } from "react-bootstrap";

export default props => {
    return (
        <Container>
            <center><h1>Login</h1></center>
            <LoginContainer/>
        </Container>
    ) 
    
}