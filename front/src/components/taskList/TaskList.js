import React from "react";
import Task from "./Task";
import { Row } from "react-bootstrap";

export default props => {
    return (
        <React.Fragment>
            {props.items.allIds.map(id => {
                let item = props.items.byIds[id];
                if (!item) return;
                return (
                    <Row>
                        <Task {...item}/>
                    </Row>
                )
            })}
        </React.Fragment>
    )
}