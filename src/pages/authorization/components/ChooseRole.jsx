import {useState} from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import Select from 'react-select';
import {selectorColors} from '../../../styles/styles';
import {ADMIN, STUDENT, TEACHER} from '../../../constants/userRoles';
import {useDispatch} from 'react-redux';
import {useSaveUserMutation} from "../../../store/user/userApiSlice";
import {useFetchTenantsQuery} from "../../../store/tenant/tenantApiSlice";
import {
  useFetchDepartmentsByUniversityIdQuery,
  useFetchSubDepartmentsQuery
} from "../../../store/department/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchGroupsByDepartmentQuery} from "../../../store/group/groupApiSlice";
import {messageAdded} from "../../../store/message/messageSlice";
import logo from "../../../assets/logo192.png"
import {authService} from "../../../services/authService";
import {useTranslation} from "react-i18next";

export default function ChooseRole() {

  const dispatch = useDispatch();
  const {t} = useTranslation("registration");

  const [userRole, setUserRole] = useState();
  const [university, setUniversity] = useState();
  const [universityName, setUniversityName] = useState();
  const [institute, setInstitute] = useState();
  const [department, setDepartment] = useState();
  const [group, setGroup] = useState();

  const [saveUser] = useSaveUserMutation();

  const {data: universities} = useFetchTenantsQuery();
  const {currentData: institutes} = useFetchDepartmentsByUniversityIdQuery(university?.value ?? skipToken);
  const {currentData: departments} = useFetchSubDepartmentsQuery(institute?.value ?? skipToken);
  const {currentData: groups} = useFetchGroupsByDepartmentQuery(department?.value ?? skipToken);

  const userRoles = [
    {
      value: STUDENT,
      label: t('continue_like_student')
    },
    {
      value: TEACHER,
      label: t('continue_like_teacher')
    }
  ];

  function submit(e) {
    e.preventDefault();

    if (!userRole) {
      dispatch(messageAdded(t("please_choose_your_user_type")));
    }

    if (userRole && userRole !== ADMIN) {
      if (!university) {
        dispatch(messageAdded(t("please_choose_university")));
      }

      if (university && !institute) {
        dispatch(messageAdded(t("please_choose_institute")));
      }

      if (institute && !department) {
        dispatch(messageAdded(t("please_choose_department")));
      }
    }

    if (validateAdmin(userRole, universityName)
      || validateUser(userRole, university, institute, department)) {
      saveUser({
        role: userRole,
        departmentId: department?.value,
        groupId: group?.value,
        universityId: university?.value,
        universityName
      }).then(() => authService.tryToRefresh())
        .then(() => window.location.reload());
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
            src={logo}
            alt=""
            title="icon"
            className={"avatar-icon"}
          />
        </Row>
        <Row className="justify-content-center margin-bottom">
          <h5 className={"text-center"}>{t("continue_sign_up")}</h5>
        </Row>
        <Form onSubmit={submit}>
          <Select
            className={"selector"}
            theme={selectorColors}
            placeholder={t("user_type") + " *"}
            options={userRoles}
            onChange={(e) => setUserRole(e.value)}
          />
          {userRole === ADMIN && (
            <Form.Control
              placeholder={t("university_name") + " *"}
              onChange={e => setUniversityName(e.target.value)}
              required
            />
          )}
          {userRole && userRole !== ADMIN && (
            <div>
              <Select
                className={"selector"}
                theme={selectorColors}
                placeholder={t("university") + " *"}
                options={universities}
                value={university}
                onChange={setUniversity}
              />
              <Select
                className={"selector"}
                theme={selectorColors}
                placeholder={t("institute") + " *"}
                options={institutes}
                value={institute}
                onChange={setInstitute}
              />
              <Select
                className={"selector"}
                theme={selectorColors}
                placeholder={t("department") + " *"}
                options={departments}
                value={department}
                onChange={setDepartment}
              />
            </div>
          )}
          {userRole === STUDENT && (
            <Select
              className={"selector"}
              theme={selectorColors}
              placeholder={t("group")}
              options={groups?.filter(group => group.visible)}
              value={group}
              onChange={setGroup}
            />
          )}
          <Button variant={"purple"} type={"submit"}>
            {t("sign_up")}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
