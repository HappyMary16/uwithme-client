import React, { Component } from "react";
import DepartmentsList from "./DepartmentsList";
import ListGroup from "react-bootstrap/ListGroup";
import { ListItem } from "./ListItem";

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
            icon={
              <img
                src="/InstituteIcon.png"
                alt=""
                width="25"
                height="25"
                title="institute"
              />
            }
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
