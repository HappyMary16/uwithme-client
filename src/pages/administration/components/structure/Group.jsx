import React, { Component } from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';

export default class Group extends Component {
  constructor(props) {
    super(props);

    this.someAction = this.someAction.bind(this);
  }

  someAction() {
    console.log('action');
  }

  render() {
    const { group } = this.props;

    return (
      <ListItem button onClick={this.instituteHandleClick}>
        <ListItemText primary={group.label} />
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
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}
