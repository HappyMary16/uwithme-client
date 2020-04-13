import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../locales/i18n';
import { selectorColors } from '../../../common/styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';

export const AddDepartment = ({ institutes, open, handleClose, handleCreate }) => {
  const [institute, setInstitute] = React.useState();
  const [departmentName, setDepartmentName] = React.useState('');

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{i18n.t('create_department')}</DialogTitle>
      <DialogContent>

        <DialogContentText>
          {i18n.t('select_institute')}
        </DialogContentText>
        <CreatableSelect
          theme={selectorColors}
          placeholder={i18n.t('institute')}
          options={institutes}
          onChange={setInstitute}
          onCreateOption={(e) => setInstitute({
            value: e,
            label: e
          })}
          value={institute}
        />

        <DialogContentText>
          {i18n.t('input_department_name')}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label={i18n.t('department_name')}
          fullWidth
          onChange={(e) => setDepartmentName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          {i18n.t('cancel')}
        </Button>
        <Button onClick={() => {
          handleCreate(institute.label, institute.value, departmentName);
          handleClose();
        }} color="primary">
          {i18n.t('create')}
        </Button>
      </DialogActions>

    </Dialog>
  );
};
