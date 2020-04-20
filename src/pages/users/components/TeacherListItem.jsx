import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { getName } from '../../../utils/UsersUtil';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { TEACHER_HOME_PAGE, TEACHER_SCHEDULE } from '../../../constants/links';
import { history } from '../../../store/Store';

export const TeacherListItem = ({ teacher }) => {

  let handleClick = () => {
    history.push(TEACHER_HOME_PAGE(teacher.id));
  };

  //TODO fix photo
  return (
    <ListItem button
              onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt='Teacher' src='empty-avatar.jpg'/>
      </ListItemAvatar>
      <ListItemText
        primary={getName(teacher)}
        secondary={teacher.scienceDegreeName}
      />
      <ListItemSecondaryAction>
        <IconButton
          href={TEACHER_SCHEDULE(teacher.id)}
        >
          <AssignmentIcon/>
        </IconButton>
      </ListItemSecondaryAction>

    </ListItem>
  );
};
