import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(8)
  }
}));

export const ListFiles = ({ open }) => {
  const classes = useStyles();

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Lecture" />
        </ListItem>
        <ListItem button className={classes.nested}>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
      </List>
    </Collapse>
  );
};
