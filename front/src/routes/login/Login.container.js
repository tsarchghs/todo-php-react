import React from "react";
import { connect } from "react-redux";
import { postLogin } from "../../actions/Login.actions";
import { withRouter } from 'react-router-dom';
import { Alert, Form, Button } from "react-bootstrap";

class LoginContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }
    onChange = (e,key) => this.setState({[key]: e.target.value})
    onSubmit = e => {
        e.preventDefault();
        this.props.postLogin({
            email: this.state.email,
            password: this.state.password,
        })
    }
    render() {
        return (
                <Form onSubmit={this.onSubmit}>
                    {
                        this.props.error && this.props.errors.map((msg,i) => 
                            <Alert key={i} variant="danger">{msg}</Alert>
                        ) 
                    }
                    Email: <Form.Control type="email" onChange={e => this.onChange(e,"email")} value={this.state.email} /><br/>
                    Password: <Form.Control type="password" onChange={e => this.onChange(e,"password")} value={this.state.password} /><br/>
                    { !this.props.loading && <Button type="submit">Login</Button> }
                    { this.props.loading && "Loading" }
                </Form>
        )
    }
}

const mapStateToProps = state => state.login

export default connect(mapStateToProps, { postLogin })(LoginContainer)