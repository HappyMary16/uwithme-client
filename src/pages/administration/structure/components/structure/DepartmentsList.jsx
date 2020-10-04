import React, { Component } from 'react';
import Department from './Department';
import { getGroupsByDepartment } from '../../../../../utils/StructureUtils';
import ListGroup from 'react-bootstrap/ListGroup';
import Collapse from 'react-bootstrap/Collapse';

export default class DepartmentsList extends Component {
  constructor(props) {
    super(props);

    this.someAction = this.someAction.bind(this);
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { departments, groups, open } = this.props;

    return (
      <Collapse in={open}>
        <ListGroup>
          {departments && departments.map((department, i) => (
            <Department
              key={i}
              department={department}
              groups={getGroupsByDepartment(groups, department)}
            />
          ))}
        </ListGroup>
      </Collapse>
    );
  }
}
