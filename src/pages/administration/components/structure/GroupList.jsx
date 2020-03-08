import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import Group from './Group';

export default class GroupList extends Component {
  constructor(props) {
    super(props);

    this.someAction = this.someAction.bind(this);
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { groups, open, classes } = this.props;

    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nested}>
          {groups.map((group, i) => (
            <Group key={i} group={group} />
          ))}
        </List>
      </Collapse>
    );
  }
}
