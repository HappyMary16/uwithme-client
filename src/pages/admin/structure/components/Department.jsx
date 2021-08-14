import React, { Component } from "react";
import { GroupList } from "./GroupList";
import ListGroup from "react-bootstrap/ListGroup";
import { ListItem } from "../../../common/components/ListItem";
import { DepartmentIcon } from "../../../icons/DepartmentIcon";

export default class Department extends Component {
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
    const { department, groups } = this.props;
    const { open } = this.state;

    return (
      <div>
        <ListGroup.Item
          className={"padding-left"}
          action
          onClick={this.instituteHandleClick}
        >
          <ListItem
            open={open}
            text={department.label}
            icon={<DepartmentIcon />}
          />
        </ListGroup.Item>

        <GroupList open={open} groups={groups} />
      </div>
    );
  }
}
