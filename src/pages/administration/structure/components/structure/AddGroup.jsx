import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../../../locales/i18n';
import { selectorColors } from '../../../../../common/styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { getDepartmentsByInstitute, getInstituteById } from '../../../../../utils/StructureUtils';
import { COURSE_NUMBER } from '../../../../../constants/userRoles';
import Select from 'react-select';

export const AddGroup = ({ institutes, departments, open, handleClose, handleCreate }) => {
  const [institute, setInstitute] = React.useState();
  const [department, setDepartment] = React.useState();
  const [groupName, setGroupName] = React.useState();
  const [course, setCourse] = React.useState(COURSE_NUMBER[0]);

  const [filteredInstitutes, setFilteredInstitutes] = React.useState(institutes);
  const [filteredDepartments, setFilteredDepartments] = React.useState(departments);

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{i18n.t('create_group')}</DialogTitle>
      <form onSubmit={e => {
        e.preventDefault();
        handleCreate(institute.value,
          institute.label,
          department.value,
          department.label,
          course.value,
          groupName);

        handleClose();
        setInstitute(null);
        setDepartment(null);
        setGroupName(null);
        setCourse(1);
      }}>
        <DialogContent>
          <DialogContentText>
            {i18n.t('select_institute')}
          </DialogContentText>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('institute')}
            options={filteredInstitutes}
            onChange={(e) => {
              setInstitute(e);
              if (department && department.instituteId !== e.value) {
                setDepartment(null);
              }
              setFilteredDepartments(getDepartmentsByInstitute(departments, e));
            }}
            onCreateOption={(e) => {
              setInstitute({
                value: e,
                label: e
              });
              if (department && department.value !== department.label) {
                setDepartment(null);
              }
              setFilteredDepartments([]);
            }}
            value={institute}
            required
          />

          <DialogContentText>
            {i18n.t('select_department')}
          </DialogContentText>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('department')}
            options={filteredDepartments}
            onChange={(e) => {
              setDepartment(e);
              let institute = getInstituteById(institutes, e.instituteId);
              setInstitute(institute);
              setFilteredDepartments(institute);
            }}
            onCreateOption={(e) => {
              setDepartment({
                value: e,
                label: e,
                instituteId: e
              });
              setFilteredInstitutes(institutes);
            }}
            value={department}
            required
          />

          <DialogContentText>
            {i18n.t('select_course')}
          </DialogContentText>
          <Select
            theme={selectorColors}
            onChange={setCourse}
            options={COURSE_NUMBER}
            defaultValue={COURSE_NUMBER[0]}
          />

          <DialogContentText>
            {i18n.t('input_group_name')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={i18n.t('group_name')}
            fullWidth
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {i18n.t('cancel')}
          </Button>
          <Button type="submit" color="primary">
            {i18n.t('create')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
