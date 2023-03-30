import React, {useEffect, useState} from 'react';
import i18n from '../../../../locales/i18n';
import {selectorColors} from '../../../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import {Button, Form, Modal} from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {useFetchUserQuery} from "../../../../store/slices/authApiSlice";
import {createGroup} from "../../../../actions/groupActions";
import {
  useFetchDepartmentQuery,
  useFetchSubDepartmentsQuery, useFetchDepartmentsByUniversityIdQuery,
  useSaveDepartmentMutation
} from "../../../../store/slices/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export function AddGroup({handleClose, group}) {

  const dispatch = useDispatch();
  const [saveDepartment] = useSaveDepartmentMutation();

  const universityId = useFetchUserQuery().data?.universityId;

  const {data: groupDepartment} = useFetchDepartmentQuery(group?.departmentId ?? skipToken);
  const {data: groupInstitute} = useFetchDepartmentQuery(groupDepartment?.instituteId ?? skipToken);

  const [department, setDepartment] = useState();
  const [institute, setInstitute] = useState();
  const [groupName, setGroupName] = useState(group?.label);
  const [startYear, setStartYear] = useState(group ? group.startYear : new Date().getFullYear());
  const [isShowingInRegistration, setShowingInRegistration] = useState(group ? group.isShowingInRegistration : true);

  const {data: institutes} = useFetchDepartmentsByUniversityIdQuery(universityId ?? skipToken);
  const {currentData: filteredDepartments} = useFetchSubDepartmentsQuery(institute?.value ?? skipToken);

  useEffect(() => {
    if (groupInstitute && !institute) {
      setInstitute(groupInstitute);
    }
  }, [groupInstitute, institute])

  let onChangeInstitute = e => {
    setInstitute(e);
    if (department && department.instituteId !== e.value) {
      setDepartment(null);
    }
  };

  let onCreateInstitute = e => {
    setInstitute({
      value: e,
      label: e
    });
    if (department && institutes[department.instituteId]) {
      setDepartment(null);
    }
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
    let departmentId = department.value;
    if (instituteId === institute.label) {
      saveDepartment({universityId, name: institute.label})
        .then(response => saveDepartment({universityId, instituteId: response?.data?.id, name: department.label})
          .then(response => dispatch(createGroup(universityId, response?.data?.instituteId, response?.data?.id,
            startYear, groupName, isShowingInRegistration))));
    } else if (departmentId === department.label) {
      saveDepartment({universityId, instituteId, name: department.label})
        .then(response => dispatch(createGroup(universityId, instituteId, response?.data?.id,
          startYear, groupName, isShowingInRegistration)));
    } else {
      dispatch(createGroup(universityId, instituteId, departmentId, startYear, groupName, isShowingInRegistration));
    }

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
            options={institutes}
            onChange={e => onChangeInstitute(e)}
            onCreateOption={e => onCreateInstitute(e)}
            value={institute}
            defaultValue={groupInstitute}
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
            defaultValue={groupDepartment}
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
