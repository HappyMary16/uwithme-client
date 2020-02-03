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
import i18n from '../../../locales/i18n';
import { getLectures, getTasks } from '../../../utils/FileUtil';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export const SubjectFiles = ({ name, files }) => {
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
            <ListItemText primary={i18n.t('lecture')} />
            {lectureOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <ListFiles open={lectureOpen} files={getLectures(files)} />

          <ListItem button className={classes.nested} onClick={taskHandleClick}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary={i18n.t('task')} />
            {taskOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <ListFiles open={taskOpen} files={getTasks(files)} />
        </List>
      </Collapse>
    </List>
  );
};
