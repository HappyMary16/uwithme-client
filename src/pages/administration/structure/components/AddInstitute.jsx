import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../../locales/i18n';

export const AddInstitute = ({ open, handleClose, handleCreate }) => {
  const [instituteName, setInstituteName] = React.useState('');

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{i18n.t('create_institute')}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {i18n.t('input_institute_name')}
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='name'
          label={i18n.t('institute_name')}
          fullWidth
          onChange={(e) => setInstituteName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {i18n.t('cancel')}
        </Button>
        <Button onClick={() => {
          handleCreate(instituteName);
          handleClose();
        }} color='primary'>
          {i18n.t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
