import React from "react";
import { Card, Button, Alert, Form } from "react-bootstrap"
import { connect } from "react-redux";
import { updateTask } from "../../actions/Task.actions"; 

class TaskProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            editMode: false,
            title: undefined,
            description: undefined
        }
    }
    changeEditMode = value => {
        this.setState(prevState => {
            let task = this.props.tasks.byIds[this.props.selectedTask];
            prevState.editMode = value
            if (value) {
                prevState = { ...prevState, ...task }
            }
            return prevState;
        })
    }
    onChange = (key,e) => e => this.setState({[key]: e.target.value});
    update = e => {
        e.preventDefault()
        let task = this.props.tasks.byIds[this.props.selectedTask];
        this.props.updateTask({
            id: task.id,
            title: this.state.title,
            description: this.state.description
        })
    }
    render(){
        let task = this.props.tasks.byIds[this.props.selectedTask];
        if (!task) return <Card>No selected task</Card>
        
        let updateLoading = task.status && task.status.type === "UPDATE" && task.status.loading
        return (
            <Card>
                { !this.state.editMode && 
                    <Card.Body>
                        <Card.Title>
                            {task.title} 
                            <Button 
                                variant="warning"
                                onClick={() => this.changeEditMode(true)}
                            >Edit</Button>
                        </Card.Title>
                        <Card.Text>
                            {task.description}
                        </Card.Text>
                    {task.createdAt}
                    </Card.Body>
                }
                { this.state.editMode && 
                    <Card.Body>
                        <Form onSubmit={this.update}>
                            {
                                task.status && task.status.error && task.status.errors.map((msg, i) =>
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
                                    type="title" 
                                    value={this.state.description}
                                    onChange={this.onChange("description")}
                                />
                            </Card.Text>
                            {task.createdAt}
                            { updateLoading && "Updating" }
                            { !updateLoading && <Button variant="warning" type="submit">Update</Button> } 
                            <Button onClick={() => this.changeEditMode(false)}>Cancel</Button>
                        </Form>
                    </Card.Body>
                }
            </Card>
        )
    }
}

const mapStateToProps = state => ({ tasks: state.tasks, selectedTask: state.app.selectedTask })

export default connect(mapStateToProps, { updateTask })(TaskProfile);