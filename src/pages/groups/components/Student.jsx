import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { getName } from '../../../utils/UsersUtil';
import { USER_HOME_PAGE } from '../../../constants/links';
import { history } from '../../../store/Store';

export const Student = ({ student }) => {

  let handleClick = () => {
    history.push(USER_HOME_PAGE(student.id));
  };

  return (
    <ListItem button
              onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt='photo'
                src='/empty-avatar.jpg'/>
      </ListItemAvatar>
      <ListItemText
        primary={getName(student)}
        secondary={student.studyGroupName}
      />
    </ListItem>
  );
};