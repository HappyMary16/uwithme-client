import React from 'react';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import Group from './Group';

export const GroupList = ({ groups, open, classes }) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding className={classes.nested}>
        {groups.map((group, i) => (
          <Group key={i} group={group}/>
        ))}
      </List>
    </Collapse>
  );
};
