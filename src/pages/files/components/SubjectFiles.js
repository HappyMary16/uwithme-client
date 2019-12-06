import React from 'react';

import { ListFiles } from './ListFiles';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export const SubjectFiles = ({ name, lectures, tasks }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [lectureOpen, setLectureOpen] = React.useState(false);
  const [taskOpen, setTaskOpen] = React.useState(false);

  const subjectHandleClick = () => {
    setOpen(!open);
  };

  const lectureHandleClick = () => {
    setLectureOpen(!lectureOpen);
  };

  const taskHandleClick = () => {
    setTaskOpen(!taskOpen);
  };

  return (
    <List>
      <ListItem button onClick={subjectHandleClick}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            onClick={lectureHandleClick}
            className={classes.nested}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Lecture" />
            {lectureOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <ListFiles open={lectureOpen} files={lectures} />

          <ListItem button className={classes.nested} onClick={taskHandleClick}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
            {taskOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <ListFiles open={taskOpen} files={tasks} />
        </List>
      </Collapse>
    </List>
  );
};
