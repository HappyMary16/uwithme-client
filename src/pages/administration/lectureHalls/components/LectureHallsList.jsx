import React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import i18n from '../../../../locales/i18n';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export const LectureHallsList = ({ lectureHalls, open, classes }) => {
  return (
    <Collapse in={open} timeout='auto' unmountOnExit>
      <List component='div' disablePadding className={classes.nested}>
        {lectureHalls && lectureHalls.map((lectureHall, i) => (
          <ListItem key={i}>
            <ListItemIcon>
              <MeetingRoomIcon/>
            </ListItemIcon>
            <ListItemText primary={lectureHall.label
            + ' (' + i18n.t('place_number') + ': '
            + lectureHall.placeNumber + ')'}/>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};
