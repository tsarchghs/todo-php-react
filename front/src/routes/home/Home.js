import React from 'react';
import { connect } from "react-redux";
import { getTasks } from "../../actions/Task.actions";
import { setCreateMode } from "../../actions/App.actions";
import TaskList from "../../components/taskList";
import TaskProfile from "../../components/taskProfile"
import CreateTaskCard from "../../components/createTaskCard";
import { Container, Row, Col, Button } from "react-bootstrap";

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            createMode: false
        }
    }
    componentDidMount() {
        if (this.props.loggedIn) this.props.getTasks();
    }
    componentDidUpdate(prevProps) {
        if (this.props.loggedIn && prevProps.loggedIn !== this.props.loggedIn ) this.props.getTasks();
    }
    render(){
        return (
            <Container fluid>
                <div>Home</div>
                {!this.props.loggedIn && <p>Log-in to use the app</p>}
                {
                    this.props.loggedIn &&
                    <Row>
                        <Col>
                            {this.props.loggedIn && <TaskList items={this.props.tasks} />}
                            {
                                this.props.tasks && !this.props.tasks.loading &&
                                    <Button onClick={this.props.setCreateMode} variant="success">Create</Button>
                            }
                        </Col>
                        <Col>
                            { this.props.app.createMode && <CreateTaskCard/> }
                            { !this.props.app.createMode && <TaskProfile/> }
                        </Col>
                    </Row>
                }
            </Container>
        )
    }
}

const mapStateToProps = state => ({ tasks: state.tasks, loggedIn: state.login.loggedIn, app: state.app })

export default connect(mapStateToProps, { getTasks, setCreateMode })(Home);