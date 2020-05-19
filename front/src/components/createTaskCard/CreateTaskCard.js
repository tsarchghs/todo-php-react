import React from "react";
import { Card, Button, Alert, Form, Label } from "react-bootstrap"
import { createTask } from "../../actions/Task.actions";
import { connect } from "react-redux";

class CreateTaskCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: ""
        }
    }
    onChange = (key, e) => e => this.setState({ [key]: e.target.value });
    createTask = e => {
        e.preventDefault();
        this.props.createTask(this.state)
    }
    render(){
        let createLoading = this.props.CREATE_TASK && this.props.CREATE_TASK.loading
        return (
            <Card.Body>
                <Form onSubmit={this.createTask}>
                    {
                        this.props.CREATE_TASK && this.props.CREATE_TASK.error && this.props.CREATE_TASK.errors.map((msg, i) =>
                            <Alert key={i} variant="danger">{msg}</Alert>
                        )
                    }
                    <Card.Title>
                        <Form.Text>Title:</Form.Text>
                        <Form.Control
                            type="title"
                            value={this.state.title}
                            onChange={this.onChange("title")}
                        />
                    </Card.Title>
                    <Card.Text>
                        <Form.Text>Description:</Form.Text>

                        <Form.Control
                            type="description"
                            value={this.state.description}
                            onChange={this.onChange("description")}
                        />
                    </Card.Text>
                    {createLoading && "Creating"}
                    {!createLoading && <Button variant="warning" type="submit">Create</Button>}
                </Form>
            </Card.Body>
        )
    }
}

const mapStateToProps = state => ({ CREATE_TASK: state.tasks.CREATE_TASK})

export default connect(mapStateToProps, { createTask })(CreateTaskCard);