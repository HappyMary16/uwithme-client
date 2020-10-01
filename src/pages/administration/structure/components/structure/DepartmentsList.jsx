import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import Department from './Department';
import { getGroupsByDepartment } from '../../../../../utils/StructureUtils';

export default class DepartmentsList extends Component {
  constructor(props) {
    super(props);

    this.someAction = this.someAction.bind(this);
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { departments, groups, open, classes } = this.props;

    return (
      <Collapse in={open} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {departments && departments.map((department, i) => (
            <Department
              key={i}
              department={department}
              groups={getGroupsByDepartment(groups, department)}
              classes={classes}
            />
          ))}
        </List>
      </Collapse>
    );
  }
}
