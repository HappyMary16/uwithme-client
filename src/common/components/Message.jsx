import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../locales/i18n';

export const Message = ({ open = false, message, handleClose }) => {

  return (
    <Dialog open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth='sm'
            aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>{message}</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {i18n.t('close')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
