import React from 'react';
import i18n from '../../../../locales/i18n';
import {selectorColors} from '../../../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import {getDepartmentsByInstitute} from '../../../../utils/StructureUtils';
import {Button, Form, Modal} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {useFetchUserQuery} from "../../../../store/slices/authApiSlice";
import {createGroup} from "../../../../actions/groupActions";

export function AddGroup({institutes, departments, handleClose, group}) {

  const dispatch = useDispatch();

  const universityId = useFetchUserQuery().data?.universityId;

  const [department, setDepartment] = React.useState(!!group && departments[group.departmentId]);
  const [institute, setInstitute] = React.useState(!!group && institutes[department?.instituteId]);
  const [groupName, setGroupName] = React.useState(group?.label);
  const [startYear, setStartYear] = React.useState(group ? group.startYear : new Date().getFullYear());
  const [isShowingInRegistration, setShowingInRegistration] = React.useState(group ? group.isShowingInRegistration : true);

  const [filteredDepartments, setFilteredDepartments] = React.useState(getDepartmentsByInstitute(departments, institute));

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
    if (department && institutes[department.instituteId]) {
      setDepartment(null);
    }
    setFilteredDepartments([]);
  };

  let onCreateDepartment = e => {
    setDepartment({
      value: e,
      label: e,
      instituteId: e
    });
  };

  let onCreate = () => {
    let instituteId = institute.value;
    if (instituteId === institute.label) {
      instituteId = null;
    }

    let departmentId = department.value;
    if (departmentId === department.label) {
      departmentId = null;
    }

    dispatch(createGroup(universityId, instituteId, institute.label, departmentId,
      department.label, startYear, groupName, isShowingInRegistration));

    handleClose();
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{i18n.t('create_group')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group>
          <CreatableSelect
            className={'selector'}
            theme={selectorColors}
            placeholder={i18n.t('institute')}
            options={Object.values(institutes)}
            onChange={e => onChangeInstitute(e)}
            onCreateOption={e => onCreateInstitute(e)}
            value={institute}
            required
          />
          <CreatableSelect
            className={'selector'}
            theme={selectorColors}
            placeholder={i18n.t('department')}
            options={filteredDepartments}
            onChange={e => setDepartment(e)}
            onCreateOption={e => onCreateDepartment(e)}
            value={department}
            required
          />
          <Form.Control
            type={'number'}
            placeholder={i18n.t('start_year')}
            onChange={e => setStartYear(e.target.value)}
            value={startYear}
          />
          <Form.Control
            placeholder={i18n.t('group_name')}
            onChange={e => setGroupName(e.target.value)}
            value={groupName}
          />

          <Form.Check
            type={'checkbox'}
            label={i18n.t('show_in_registration')}
            onChange={() => setShowingInRegistration(!isShowingInRegistration)}
            checked={isShowingInRegistration}
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
}
