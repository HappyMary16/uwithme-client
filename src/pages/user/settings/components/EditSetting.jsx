import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import i18n from '../../../../locales/i18n';
import {CustomSelector} from '../../../common/components/CustomSelector';
import {hasRole} from '../../../../utils/UsersUtil';
import {ADMIN, STUDENT} from '../../../../constants/userRoles';
import {useDispatch, useSelector} from "react-redux";
import {loadInstitute, loadInstitutes} from "../../../../actions/instituteActions";
import {loadDepartment, loadDepartments} from "../../../../actions/departmentActions";
import {loadGroup, loadGroups} from "../../../../actions/groupActions";
import {updateUser} from "../../../../actions/userActions";
import {useFetchUserQuery} from "../../../../store/slices/authApiSlice";
import {loadUniversity} from "../../../../actions/universityActions";

export default function EditSetting({isEditMode, setEditMode}) {

  const dispatch = useDispatch();

  const user = useFetchUserQuery().data;

  const userInstitute = useSelector(state => state.instituteReducers.userInstitute);
  const userDepartment = useSelector(state => state.departmentReducers.userDepartment);
  const userGroup = useSelector(state => state.groupReducers.userGroup);
  const userUniversity = useSelector(state => state.universityReducers.userUniversity);

  const institutes = useSelector(state => Object.values(state.instituteReducers.institutes));
  const departments = useSelector(state => Object.values(state.departmentReducers.departments));
  const groups = useSelector(state => Object.values(state.groupReducers.groups));
  const universities = useSelector(state => state.universityReducers.universities);

  const [university, setUniversity] = useState(userUniversity);
  const [institute, setInstitute] = useState(userInstitute);
  const [department, setDepartment] = useState(userDepartment);
  const [group, setGroup] = useState(userGroup);

  useEffect(() => {
    dispatch(loadUniversity());
    dispatch(loadInstitute());
    dispatch(loadDepartment());
    if (hasRole(user, STUDENT)) {
      dispatch(loadGroup());
    }
  }, [user, dispatch])

  function selectUniversity(e) {
    setUniversity(e);
    setInstitute(null);
    setDepartment(null);
    setGroup(null);
    dispatch(loadInstitutes(e.value));
  }

  function selectInstitute(e) {
    setInstitute(e);
    setDepartment(null);
    setGroup(null);
    dispatch(loadDepartments(e.value));
  }

  function selectDepartment(e) {
    setDepartment(e);
    setGroup(null);
    dispatch(loadGroups(e.value));
  }

  function cancel() {
    setUniversity(userUniversity);
    setInstitute(userInstitute);
    setDepartment(userDepartment);
    setGroup(userGroup);

    setEditMode(false);
  }

  function submit(e) {
    e.preventDefault();

    if (user && (university || institute || department || group)) {
      dispatch(
        updateUser(
          university ? university : userUniversity,
          institute ? institute : userInstitute,
          department ? department : userDepartment,
          group || department ? group : userGroup
        )
      );
    }

    setEditMode(false);
  }

  return (
    <Form onSubmit={submit}>
      <Form.Label>{i18n.t('university')}</Form.Label>
      <CustomSelector
        isEditMode={!hasRole(user, ADMIN) && isEditMode}
        options={universities}
        value={university}
        onChange={selectUniversity}
      />
      <div>
        <Form.Label>{i18n.t('institute')}</Form.Label>
        <CustomSelector
          isEditMode={isEditMode}
          options={institutes}
          value={institute}
          onChange={selectInstitute}
        />
        <Form.Label>{i18n.t('department')}</Form.Label>
        <CustomSelector
          isEditMode={isEditMode}
          options={departments}
          value={department}
          onChange={selectDepartment}
        />
      </div>
      {hasRole(user, STUDENT) && (
        <div>
          <Form.Label>{i18n.t('group')}</Form.Label>
          <CustomSelector
            isEditMode={isEditMode}
            options={groups}
            value={group}
            onChange={setGroup}
          />
        </div>
      )}
      {isEditMode && (
        <Row className='justify-content-around'>
          <Col
            xs={12}
            md={{offset: 4, span: 4}}
            lg={{offset: 6, span: 3}}
            xl={{offset: 6, span: 3}}
          >
            <Button block variant={'purple'} onClick={cancel}>
              {i18n.t('cancel')}
            </Button>
          </Col>
          <Col xs={12} md={4} lg={3} xl={3}>
            <Button block variant={'purple'} type={'submit'}>
              {i18n.t('save')}
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
}
