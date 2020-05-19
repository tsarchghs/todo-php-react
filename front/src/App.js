import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { connect } from "react-redux";
import { getLogin } from "./actions/Login.actions";
import Header from './components/header';

import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  componentDidMount(){
    this.props.getLogin()
  }
  render(){
    return (
      <React.Fragment>
        <Router>
          <Header/>
          <Routes/>
        </Router>
      </React.Fragment>
    )
  }
}

export default connect(null, { getLogin })(App);
