import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { userService } from "../services/authentication.service";
import { connect } from "react-redux";
import Home from "./home";
import Login from "./login";
import E404 from "./E404";

const ProtectedRoute = ({ Component, loggedIn, allowLoggedIn, props = {} }) => {
    if (loggedIn === allowLoggedIn) return <Component {...props} />
    else return <Redirect to="/" />
}

class Routes extends React.Component{
    render(){
        return (
            <Switch>
    
                <Route path="/" exact>
                    <Home />
                </Route>
    
                <Route path="/login" exact>
                    <ProtectedRoute Component={Login} loggedIn={this.props.loggedIn} allowLoggedIn={false} />
                </Route>
    
                <Route path="/">
                    <E404 />
                </Route>
    
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    return { loggedIn: state.login.loggedIn }
}

export default connect(mapStateToProps)(Routes)