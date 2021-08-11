import React, { Component } from "react";
import DepartmentsList from "./DepartmentsList";
import ListGroup from "react-bootstrap/ListGroup";
import { ListItem } from "./ListItem";
import { InstituteIcon } from "../../../icons/InstituteIcon";

export default class Institute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };

    this.someAction = this.someAction.bind(this);
    this.instituteHandleClick = this.instituteHandleClick.bind(this);
  }

  instituteHandleClick() {
    const { open } = this.state;
    this.setState({ open: !open });
  }

  someAction() {
    console.log("action");
  }

  render() {
    const { institute, groups, departments } = this.props;
    const { open } = this.state;

    return (
      <div>
        <ListGroup.Item action onClick={this.instituteHandleClick}>
          <ListItem
            open={open}
            text={institute.label}
            icon={<InstituteIcon />}
          />
        </ListGroup.Item>

        <DepartmentsList
          open={open}
          groups={groups}
          departments={departments}
        />
      </div>
    );
  }
}
