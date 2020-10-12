import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../../locales/i18n';
import Select from 'react-select';
import { selectorColors } from '../../../../styles/styles';
import { getName } from '../../../../utils/UsersUtil';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  dialogPaper: {
    minHeight: '30vh'
  }
};

const AddStudentToGroup = ({
  open,
  students,
  handleClose,
  handleAdd,
  classes
}) => {
  const [selectedStudents, setStudents] = React.useState('');

  return (
    <Dialog
      classes={{ paper: classes.dialogPaper }}
      fullWidth={true}
      maxWidth="sm"
      scroll="paper"
      open={open}
      onClose={handleClose}
    >
      <DialogTitle id="form-dialog-title">
        {i18n.t('add_student_to_group')}
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{i18n.t('select_student')}</DialogContentText>
        <Select
          theme={selectorColors}
          onChange={setStudents}
          options={
            students &&
            students.map(s => {
              return {
                value: s.id,
                label: getName(s)
              };
            })
          }
          isMulti
          placeholder={i18n.t('student')}
          menuPlacement={'auto'}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {i18n.t('cancel')}
        </Button>
        <Button
          onClick={() => {
            handleAdd(selectedStudents.map(s => s.value));
            handleClose();
          }}
          color="primary"
        >
          {i18n.t('add')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(AddStudentToGroup);
