import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import i18n from '../../../../../locales/i18n';
import { selectorColors } from '../../../../../common/styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import { getDepartmentsByInstitute, getInstituteById } from '../../../../../utils/StructureUtils';
import { COURSE_NUMBER } from '../../../../../constants/userRoles';
import Select from 'react-select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import '../../../../../common/styles/styles.css';

export const AddGroup = ({ institutes, departments, open, handleClose, handleCreate }) => {
  const [institute, setInstitute] = React.useState();
  const [department, setDepartment] = React.useState();
  const [groupName, setGroupName] = React.useState();
  const [course, setCourse] = React.useState();
  const [isShowingInRegistration, setShowingInRegistration] = React.useState(true);

  const [filteredInstitutes, setFilteredInstitutes] = React.useState(null);
  const [filteredDepartments, setFilteredDepartments] = React.useState(null);

  let instituteOpinions = () => {
    if (Array.isArray(filteredInstitutes)) {
      return filteredInstitutes;
    } else {
      return institutes;
    }
  };

  let departmentOpinions = () => {
    if (Array.isArray(filteredDepartments)) {
      return filteredDepartments;
    } else {
      return departments;
    }
  };

  let onChangeInstitute = e => {
    setInstitute(e);
    if (department && department.instituteId !== e.value) {
      setDepartment(null);
    }
    setFilteredDepartments(getDepartmentsByInstitute(departments, e));
  };

  let onCreateInstitute = e => {
    setInstitute({
      value: e,
      label: e
    });
    if (department && department.value !== department.label) {
      setDepartment(null);
    }
    setFilteredDepartments([]);
  };

  let onChangeDepartment = e => {
    setDepartment(e);
    let institute = getInstituteById(institutes, e.instituteId);
    setInstitute(institute);
    setFilteredDepartments(institute);
  };

  let onCreateDepartment = e => {
    setDepartment({
      value: e,
      label: e,
      instituteId: e
    });
    setFilteredInstitutes(institutes);
  };

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
          groupName,
          isShowingInRegistration);

        handleClose();
        setInstitute(null);
        setDepartment(null);
        setGroupName(null);
        setCourse(1);
      }}>
        <DialogContent>
          <CreatableSelect
            theme={selectorColors}
            placeholder={i18n.t('institute')}
            options={instituteOpinions()}
            onChange={e => onChangeInstitute(e)}
            onCreateOption={e => onCreateInstitute(e)}
            value={institute}
            required
          />
          <CreatableSelect
            className='selector'
            theme={selectorColors}
            placeholder={i18n.t('department')}
            options={departmentOpinions()}
            onChange={e => onChangeDepartment(e)}
            onCreateOption={e => onCreateDepartment(e)}
            value={department}
            required
          />

          <Select
            className='selector'
            placeholder={i18n.t('course')}
            theme={selectorColors}
            onChange={setCourse}
            options={COURSE_NUMBER}
          />

          <FormControlLabel
            control={
              <Checkbox
                color='primary'
                onChange={() => setShowingInRegistration(!isShowingInRegistration)}
                checked={isShowingInRegistration}/>}
            label={i18n.t('show_in_registration')}/>

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
