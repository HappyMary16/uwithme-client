import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../locales/i18n';
import { getName } from '../../../utils/UsersUtil';

export const RemoveStudentFromGroup = ({ open, student, handleNo, handleYes }) => {

  return (
    <Dialog
      fullWidth={true}
      maxWidth='sm'
      scroll='paper'
      open={open}
      onClose={handleNo}>
      <DialogTitle id='form-dialog-title'>{i18n.t('remove_student_from_group')}</DialogTitle>

      <DialogContent>
        <DialogContentText>
          {getName(student)}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleNo} color='primary'>
          {i18n.t('no')}
        </Button>
        <Button onClick={() => {
          handleYes(student.id);
          handleNo();
        }} color='primary'>
          {i18n.t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};