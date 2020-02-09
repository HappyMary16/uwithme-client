import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import GetAppIcon from '@material-ui/icons/GetApp';
import DescriptionIcon from '@material-ui/icons/Description';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { blueGrey, grey } from '@material-ui/core/colors';

import IconButton from '@material-ui/core/IconButton';
import { apiRoot, DOWNLOAD_FILE } from '../../../common/constants/serverApi';
import { openFile } from '../upload/sagas';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(8)
  },
  download: {
    color: grey
  }
}));

export const ListFiles = ({ open, files }) => {
  const classes = useStyles();

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {files.map((file, i) => (
          <ListItem
            button
            key={i}
            className={classes.nested}
            href={openFile(file.id)}
            download={openFile(file.id)}
          >
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={file.name} />
            <ListItemSecondaryAction>
              <a href={openFile(file.id)} download={openFile(file.id)}>
                <IconButton>
                  <GetAppIcon style={{ color: blueGrey[500] }} />
                </IconButton>
              </a>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Collapse>
  );
};
