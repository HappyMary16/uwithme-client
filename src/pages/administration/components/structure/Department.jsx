import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import GroupList from './GroupList';

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
    console.log('action');
  }

  render() {
    const { department, groups, classes } = this.props;
    const { open } = this.state;

    return (
      <List>
        <ListItem button onClick={this.instituteHandleClick}>
          <ListItemText primary={department.label} />
          <ListItemSecondaryAction>
            <IconButton onClick={this.someAction}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={this.someAction}>
              <InfoIcon />
            </IconButton>
            <IconButton onClick={this.someAction}>
              <DeleteIcon />
            </IconButton>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemSecondaryAction>
        </ListItem>

        <GroupList open={open} groups={groups} classes={classes} />
      </List>
    );
  }
}