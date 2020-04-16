import React from 'react';
import { LectureHallsList } from './LectureHallsList';
import ListItem from '@material-ui/core/ListItem';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export const Building = ({ building, lectureHalls, classes }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <List>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemIcon>
          <AccountBalanceIcon/>
        </ListItemIcon>
        <ListItemText primary={building.label}/>
        {open ? <ExpandLess/> : <ExpandMore/>}
      </ListItem>
      <LectureHallsList lectureHalls={lectureHalls}
                        open={open}
                        classes={classes}/>
    </List>
  );
};
