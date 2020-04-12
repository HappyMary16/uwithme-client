import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../locales/i18n';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#483D8B'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#eeeeee'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  menu: {
    width: 200
  }
}));

export const AddInstitute = ({ open, createInstitute }) => {
  const [instituteName, setInstituteName] = React.useState('');

  const handleClose = () => {
    open = false;
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {i18n.t('create_institute')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={i18n.t('institute_name')}
          fullWidth
          onChange={() => setInstituteName}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {i18n.t('cancel')}
        </Button>
        <Button onClick={() => createInstitute(instituteName)} color="primary">
          {i18n.t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
