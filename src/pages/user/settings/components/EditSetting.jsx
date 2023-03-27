import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import i18n from '../../../../locales/i18n';
import {CustomSelector} from '../../../common/components/CustomSelector';
import {hasRole} from '../../../../utils/UsersUtil';
import {ADMIN, STUDENT, TEACHER} from '../../../../constants/userRoles';
import {useDispatch, useSelector} from "react-redux";
import {loadInstitutes} from "../../../../actions/instituteActions";
import {loadDepartments} from "../../../../actions/departmentActions";
import {loadGroups} from "../../../../actions/groupActions";
import {useFetchUserQuery, useSaveUserMutation} from "../../../../store/slices/authApiSlice";
import {loadUniversities} from "../../../../actions/universityActions";
import {setMessage} from "../../../../actions/messageAction";
import {loadUserUniversityInfo} from "../../../../actions/structureActions";

export default function EditSetting({isEditMode, setEditMode}) {

  const dispatch = useDispatch();

  const user = useFetchUserQuery().data;
  const universityId = user?.universityId;
  const [saveUser] = useSaveUserMutation();

  const institutes = useSelector(state => Object.values(state.instituteReducers.institutes));
  const departments = useSelector(state => Object.values(state.departmentReducers.departments));
  const groups = useSelector(state => Object.values(state.groupReducers.groups));
  const universities = useSelector(state => state.universityReducers.universities);

  const [university, setUniversity] = useState({});
  const [institute, setInstitute] = useState({});
  const [department, setDepartment] = useState({});
  const [group, setGroup] = useState({});

  useEffect(() => {
    dispatch(loadUniversities());
  }, [dispatch])

  useEffect(() => {
    if (user) {
      setUniversity(universities.filter(u => u.value === universityId)[0]);
      setInstitute({value: user?.institute?.id, label: user?.institute?.name});
      setDepartment({value: user?.department?.id, label: user?.department?.name});
      setGroup({value: user?.group?.id, label: user?.group?.name});
    }
  }, [user, universities, universityId]);

  useEffect(() => {
    if (isEditMode && user?.roles?.includes(TEACHER)) {
      dispatch(loadUserUniversityInfo(university?.value, institute?.value));
    }

    if (isEditMode && user?.roles?.includes(STUDENT)) {
      dispatch(loadUserUniversityInfo(university?.value, institute?.value, department?.value));
    }
  }, [user, isEditMode, university, institute, department, dispatch]);

  function selectUniversity(e) {
    setUniversity(e);
    setInstitute({});
    setDepartment({});
    setGroup({});
    dispatch(loadInstitutes(e.value));
  }

  function selectInstitute(e) {
    setInstitute(e);
    setDepartment({});
    setGroup({});
    dispatch(loadDepartments(e.value));
  }

  function selectDepartment(e) {
    setDepartment(e);
    setGroup({});
    dispatch(loadGroups(e.value));
  }

  function submit(e) {
    e.preventDefault();

    if (!university) {
      dispatch(setMessage(i18n.t("please_choose_university")));
    }

    if (university && !institute) {
      dispatch(setMessage(i18n.t("please_choose_institute")));
    }

    if (institute && !department) {
      dispatch(setMessage(i18n.t("please_choose_department")));
    }

    if (user && university && institute && department) {
      saveUser({
        universityId: university.value,
        instituteId: institute.value,
        departmentId: department.value,
        groupId: group?.value
      });

      setEditMode(false);
    }
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
            <Button block variant={'purple'} onClick={() => setEditMode(false)}>
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
