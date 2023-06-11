import {useEffect, useState} from 'react';
import i18n from '../../../config/i18n';
import {selectorColors} from '../../../styles/styles';
import CreatableSelect from 'react-select/creatable';
import {Button, Form, Modal} from 'react-bootstrap';
import {useFetchUserQuery} from "../../../store/user/userApiSlice";
import {
  useFetchDepartmentQuery,
  useFetchDepartmentsByUniversityIdQuery,
  useFetchSubDepartmentsQuery,
  useSaveDepartmentMutation
} from "../../../store/department/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {getId} from "../../../services/authService";
import {useSaveGroupMutation} from "../../../store/group/groupApiSlice";

export function AddGroup({handleClose, group}) {

  const [saveDepartment] = useSaveDepartmentMutation();
  const [saveGroup] = useSaveGroupMutation();

  const universityId = useFetchUserQuery(getId() ?? skipToken).data?.universityId;

  const {data: groupDepartment} = useFetchDepartmentQuery(group?.departmentId ?? skipToken);
  const {data: groupInstitute} = useFetchDepartmentQuery(groupDepartment?.instituteId ?? skipToken);

  const [department, setDepartment] = useState();
  const [institute, setInstitute] = useState();
  const [groupName, setGroupName] = useState(group?.label);
  const [startYear, setStartYear] = useState(group ? group.startYear : new Date().getFullYear());
  const [visible, setVisible] = useState(group ? group.visible : true);

  const {data: institutes} = useFetchDepartmentsByUniversityIdQuery(universityId ?? skipToken);
  const {currentData: filteredDepartments} = useFetchSubDepartmentsQuery(institute?.value ?? skipToken);

  useEffect(() => {
    if (groupInstitute && !institute) {
      setInstitute(groupInstitute);
    }
  }, [groupInstitute, institute])

  useEffect(() => {
    if (groupDepartment && !department) {
      setDepartment(groupDepartment);
    }
  }, [groupDepartment, department])

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
    let groupId = group?.id;

    if (instituteId === institute.label) {
      saveDepartment({universityId, name: institute.label})
        .then(response => saveDepartment({universityId, instituteId: response?.data?.id, name: department.label})
          .then(response => saveGroup({
            groupId,
            universityId,
            departmentId: response?.data?.id,
            startYear,
            name: groupName,
            visible
          })));

    } else if (departmentId === department.label) {
      saveDepartment({universityId, instituteId, name: department.label})
        .then(response => saveGroup({
          groupId,
          universityId,
          departmentId: response?.data?.id,
          startYear,
          name: groupName,
          visible
        }));

    } else {
      saveGroup({
        groupId,
        universityId,
        departmentId,
        startYear,
        name: groupName,
        visible
      })
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
            onChange={() => setVisible(!visible)}
            checked={visible}
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
