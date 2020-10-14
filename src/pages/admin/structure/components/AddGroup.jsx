import React from 'react';

import i18n from '../../../../locales/i18n';
import { selectorColors } from '../../../../styles/styles';
import CreatableSelect from 'react-select/creatable/dist/react-select.esm';
import {
  getDepartmentsByInstitute,
  getInstituteById
} from '../../../../utils/StructureUtils';
import { COURSE_NUMBER } from '../../../../constants/userRoles';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const AddGroup = ({
  institutes,
  departments,
  open,
  handleClose,
  handleCreate
}) => {
  const [institute, setInstitute] = React.useState();
  const [department, setDepartment] = React.useState();
  const [groupName, setGroupName] = React.useState();
  const [course, setCourse] = React.useState();
  const [isShowingInRegistration, setShowingInRegistration] = React.useState(
    false
  );

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

  let onCreate = () => {
    handleCreate(
      institute.value,
      institute.label,
      department.value,
      department.label,
      course.value,
      groupName,
      isShowingInRegistration
    );

    handleClose();
    setInstitute(null);
    setDepartment(null);
    setGroupName(null);
    setShowingInRegistration(false);
    setCourse(1);
  };

  return (
    <Modal show={open} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('create_group')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <CreatableSelect
            className={'selector'}
            theme={selectorColors}
            placeholder={i18n.t('institute')}
            options={instituteOpinions()}
            onChange={e => onChangeInstitute(e)}
            onCreateOption={e => onCreateInstitute(e)}
            value={institute}
            required
          />
          <CreatableSelect
            className={'selector'}
            theme={selectorColors}
            placeholder={i18n.t('department')}
            options={departmentOpinions()}
            onChange={e => onChangeDepartment(e)}
            onCreateOption={e => onCreateDepartment(e)}
            value={department}
            required
          />
          <Select
            className={'selector'}
            placeholder={i18n.t('course')}
            theme={selectorColors}
            onChange={setCourse}
            options={COURSE_NUMBER}
          />
          <Form.Control
            placeholder={i18n.t('group_name')}
            onChange={e => setGroupName(e.target.value)}
          />

          <Form.Check
            type={'checkbox'}
            label={i18n.t('show_in_registration')}
            onChange={() => setShowingInRegistration(!isShowingInRegistration)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant={'purple'}>
          {i18n.t('cancel')}
        </Button>
        <Button onClick={onCreate} variant={'purple'}>
          {i18n.t('create')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
