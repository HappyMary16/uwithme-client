import React, {useEffect, useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import i18n from '../../../locales/i18n';
import {CustomSelector} from '../../common/components/CustomSelector';
import {hasRole} from '../../../utils/UsersUtil';
import {ADMIN, STUDENT} from '../../../constants/userRoles';
import {useDispatch} from "react-redux";
import {useFetchUserQuery, useUpdateUserMutation} from "../../../store/user/userApiSlice";
import {useFetchTenantsQuery} from "../../../store/tenant/tenantApiSlice";
import {
  useFetchDepartmentsByUniversityIdQuery,
  useFetchSubDepartmentsQuery
} from "../../../store/department/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {getId} from "../../../services/authService";
import {useFetchGroupsByDepartmentQuery} from "../../../store/group/groupApiSlice";
import {messageAdded} from "../../../store/message/messageSlice";

export default function EditSetting({isEditMode, setEditMode}) {

  const dispatch = useDispatch();

  const user = useFetchUserQuery(getId() ?? skipToken).data;
  const universityId = user?.universityId;
  const [updateUser] = useUpdateUserMutation();

  const [university, setUniversity] = useState({});
  const [institute, setInstitute] = useState({});
  const [department, setDepartment] = useState({});
  const [group, setGroup] = useState({});

  const {data: institutes} = useFetchDepartmentsByUniversityIdQuery(isEditMode ? university?.value ?? skipToken : skipToken);
  const {data: departments} = useFetchSubDepartmentsQuery(isEditMode ? institute?.value ?? skipToken : skipToken);
  const {data: groups} = useFetchGroupsByDepartmentQuery(isEditMode && hasRole(STUDENT) ? department?.value ?? skipToken : skipToken);
  const universities = useFetchTenantsQuery().data

  useEffect(() => {
    if (user) {
      setUniversity(universities?.filter(u => u.value === universityId)[0]);
      setInstitute({value: user?.institute?.id, label: user?.institute?.name});
      setDepartment({value: user?.department?.id, label: user?.department?.name});
      setGroup({value: user?.group?.id, label: user?.group?.name});
    }
  }, [user, universities, universityId]);

  function selectUniversity(e) {
    setUniversity(e);
    setInstitute({});
    setDepartment({});
    setGroup({});
  }

  function selectInstitute(e) {
    setInstitute(e);
    setDepartment({});
    setGroup({});
  }

  function selectDepartment(e) {
    setDepartment(e);
    setGroup({});
  }

  function submit(e) {
    e.preventDefault();

    if (!university) {
      dispatch(messageAdded(i18n.t("please_choose_university")));
    }

    if (university && !institute) {
      dispatch(messageAdded(i18n.t("please_choose_institute")));
    }

    if (institute && !department) {
      dispatch(messageAdded(i18n.t("please_choose_department")));
    }

    if (user && university && institute && department) {
      updateUser({
        userId: user.id,
        universityId: university.value,
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
            <Button variant={'purple'} onClick={() => setEditMode(false)}>
              {i18n.t('cancel')}
            </Button>
          </Col>
          <Col xs={12} md={4} lg={3} xl={3}>
            <Button variant={'purple'} type={'submit'}>
              {i18n.t('save')}
            </Button>
          </Col>
        </Row>
      )}
    </Form>
  );
}