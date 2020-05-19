import React from "react";
import { connect } from "react-redux";
import { deleteTask } from "../../actions/Task.actions";
import { selectTask } from "../../actions/App.actions";
import { Col, Card, Button } from "react-bootstrap";

class Task extends React.Component {
    deleteTask = () => this.props.deleteTask(this.props.id);
    selectTask = () => this.props.selectTask(this.props.id);
    render(){
        let deleteLoading = this.props.status && this.props.status.type === "DELETE" && this.props.status.loading
        return (
                <Col>
                    <Card>
                        <Card.Body>
                            {this.props.id} - {this.props.title} &nbsp;&nbsp;
                            <Button onClick={this.selectTask}>Select</Button> &nbsp;
                            { deleteLoading && "Deleting" }
                            { !deleteLoading && <Button onClick={this.deleteTask}>Delete</Button> } 
                        </Card.Body>
                    </Card>
                </Col>
            )
    }
}

export default connect(null,{ deleteTask, selectTask })(Task)