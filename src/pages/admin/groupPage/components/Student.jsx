import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { getName } from '../../../../utils/UsersUtil';
import { USER_HOME_PAGE } from '../../../../constants/links';
import { history } from '../../../../store/Store';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

export const Student = ({ student, removeStudent }) => {
  let handleClick = () => {
    history.push(USER_HOME_PAGE(student.id));
  };

  return (
    <ListItem button onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt="photo" src="/empty-avatar.jpg"/>
      </ListItemAvatar>
      <ListItemText primary={getName(student)}/>
      <ListItemSecondaryAction>
        <IconButton onClick={() => removeStudent(student)}>
          <DeleteIcon/>
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
