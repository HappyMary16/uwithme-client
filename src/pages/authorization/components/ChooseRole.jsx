import React, {useEffect, useState} from 'react';
import i18n from '../../../locales/i18n';
import {Button, Col, Form, Row} from 'react-bootstrap';
import Select from 'react-select';
import {selectorColors} from '../../../styles/styles';
import {ADMIN, STUDENT, UserRoles} from '../../../constants/userRoles';
import {useDispatch, useSelector} from 'react-redux';
import {setMessage} from '../../../actions/messageAction';
import {loadInstitutes} from '../../../actions/instituteActions';
import {loadUniversities} from '../../../actions/universityActions';
import {loadDepartments} from '../../../actions/departmentActions';
import {loadGroups} from '../../../actions/groupActions';
import {useSaveUserMutation} from "../../../store/slices/authApiSlice";

export default function ChooseRole() {

  const dispatch = useDispatch();

  const [saveUser] = useSaveUserMutation();
  const institutes = useSelector(state => Object.values(state.instituteReducers.institutes));
  const departments = useSelector(state => Object.values(state.departmentReducers.departments));
  const groups = useSelector(state => state.groupReducers.groups);
  const universities = useSelector(state => state.universityReducers.universities);

  const [userRole, setUserRole] = useState();
  const [university, setUniversity] = useState();
  const [universityName, setUniversityName] = useState();
  const [institute, setInstitute] = useState();
  const [department, setDepartment] = useState();
  const [group, setGroup] = useState();

  useEffect(() => {
    dispatch(loadUniversities());
  }, [dispatch]);

  useEffect(() => {
    if (universities && universities.length === 1) {
      dispatch(loadInstitutes(universities[0].value));
    }
  }, [universities, dispatch])

  function submit(e) {
    e.preventDefault();

    if (!userRole) {
      dispatch(setMessage(i18n.t("please_choose_your_user_type")));
    }

    if (userRole && userRole !== ADMIN) {
      if (!university) {
        dispatch(setMessage(i18n.t("please_choose_university")));
      }

      if (university && !institute) {
        dispatch(setMessage(i18n.t("please_choose_institute")));
      }

      if (institute && !department) {
        dispatch(setMessage(i18n.t("please_choose_department")));
      }
    }

    if (validateAdmin(userRole, universityName)
      || validateUser(userRole, university, institute, department)) {
      saveUser({
        role: userRole,
        instituteId: institute?.value,
        departmentId: department?.value,
        groupId: group?.value,
        universityId: university?.value,
        universityName
      });
    }
  }

  function validateAdmin(userRole, universityName) {
    return userRole === ADMIN && universityName;
  }

  function validateUser(userRole, university, institute, department) {
    return userRole !== ADMIN && university && institute && department;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6} xl={5}>
        <Row className="justify-content-center">
          <img
            src="/logo32.png"
            alt=""
            title="icon"
            className={"avatar-icon"}
          />
        </Row>
        <Row className="justify-content-center margin-bottom">
          <h5>{i18n.t("continue_sign_up")}</h5>
        </Row>
        <Form onSubmit={submit}>
          <Select
            className={"selector"}
            theme={selectorColors}
            placeholder={i18n.t("user_type") + " *"}
            options={UserRoles}
            onChange={(e) => setUserRole(e.value)}
          />
          {userRole === ADMIN && (
            <Form.Control
              placeholder={i18n.t("university_name") + " *"}
              onChange={e => setUniversityName(e.target.value)}
              required
            />
          )}
          {userRole && userRole !== ADMIN && (
            <div>
              <Select
                className={"selector"}
                theme={selectorColors}
                placeholder={i18n.t("university") + " *"}
                options={universities}
                value={university}
                onChange={(e) => {
                  setUniversity(e);
                  dispatch(loadInstitutes(e.value));
                }}
              />
              <Select
                className={"selector"}
                theme={selectorColors}
                placeholder={i18n.t("institute") + " *"}
                options={institutes}
                value={institute}
                onChange={(e) => {
                  setInstitute(e);
                  dispatch(loadDepartments(e.value));
                }}
              />
              <Select
                className={"selector"}
                theme={selectorColors}
                placeholder={i18n.t("department") + " *"}
                options={departments}
                value={department}
                onChange={(e) => {
                  setDepartment(e);
                  dispatch(loadGroups(e.value));
                }}
              />
            </div>
          )}
          {userRole === STUDENT && (
            <Select
              className={"selector"}
              theme={selectorColors}
              placeholder={i18n.t("group")}
              options={groups}
              value={group}
              onChange={e => setGroup(e)}
            />
          )}
          <Button block variant={"purple"} type={"submit"}>
            {i18n.t("sign_up")}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
