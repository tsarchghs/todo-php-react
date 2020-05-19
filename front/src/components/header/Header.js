import React from "react";
import { connect } from "react-redux";
import { logout } from "../../actions/Login.actions";
import { Link } from "react-router-dom";

class Header extends React.Component {
    render() {
        let logout = <button onClick={this.props.logout}>Logout</button>
        let login = <Link to="/login">Login</Link>
        return (
            <div style={{padding: 10, paddingLeft: 30}}>
                <Link to="/">Home</Link> &nbsp;&nbsp;
                {this.props.loggedIn && logout}
                {!this.props.loggedIn && login}
                <hr/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loggedIn: state.login.loggedIn
})
export default connect(mapStateToProps, { logout })(Header);