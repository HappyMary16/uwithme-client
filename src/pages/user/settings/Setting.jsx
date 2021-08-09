import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import i18n from "../../../locales/i18n";
import Button from "react-bootstrap/Button";
import {
  loadUniversities,
  loadUniversity
} from "../../../actions/universityActions";
import { deleteUser, updateUser } from "../../../actions/userActions";
import EditSetting from "./components/EditSetting";
import {
  loadInstitute,
  loadInstitutes
} from "../../../actions/instituteActions";
import {
  loadDepartment,
  loadDepartments
} from "../../../actions/departmentActions";
import { loadGroup, loadGroups } from "../../../actions/groupActions";
import { connect } from "react-redux";
import { loadUserUniversityInfo } from "../../../actions/structureActions";
import { KeycloakSetting } from "./components/KeycloakSetting";
import Row from "react-bootstrap/Row";
import { isAdmin, isStudent } from "../../../utils/UsersUtil";

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false
    };

    this.setEditMode = this.setEditMode.bind(this);
    this.submit = this.submit.bind(this);
    this.delete = this.delete.bind(this);
    this.setUniversity = this.setUniversity.bind(this);
    this.setInstitute = this.setInstitute.bind(this);
    this.setDepartment = this.setDepartment.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;

    dispatch(loadUniversity());
    dispatch(loadInstitute());
    dispatch(loadDepartment());
    if (isStudent(user)) {
      dispatch(loadGroup());
    }
  }

  setEditMode(isEditMode) {
    const { role } = this.props.user;

    if (role !== 3 && isEditMode) {
      const {
        userUniversity,
        userInstitute,
        userDepartment,
        dispatch
      } = this.props;

      dispatch(loadUniversities());

      if (role && role === 2) {
        dispatch(
          loadUserUniversityInfo(userUniversity.value, userInstitute.value)
        );
      }

      if (role === 1) {
        dispatch(
          loadUserUniversityInfo(
            userUniversity.value,
            userInstitute.value,
            userDepartment.value
          )
        );
      }
    }

    this.setState({
      isEditMode: isEditMode
    });
  }

  submit(userToUpdate) {
    const {
      userUniversity,
      userInstitute,
      userDepartment,
      userGroup,
      user,
      dispatch
    } = this.props;

    const { university, institute, department, group } = userToUpdate;

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

    this.setState({
      isEditMode: false
    });
  }

  delete() {
    const { dispatch } = this.props;
    dispatch(deleteUser());
  }

  setUniversity(e) {
    const { dispatch } = this.props;
    dispatch(loadInstitutes(e.value));
  }

  setInstitute(e) {
    const { dispatch } = this.props;
    dispatch(loadDepartments(e.value));
  }

  setDepartment(e) {
    const { dispatch } = this.props;
    dispatch(loadGroups(e.value));
  }

  render() {
    const {
      userUniversity,
      userInstitute,
      userDepartment,
      userGroup,
      user,
      institutes,
      departments,
      universities,
      groups
    } = this.props;
    const { isEditMode } = this.state;

    return (
      <div>
        <KeycloakSetting user={user} />
        <hr />
        <EditSetting
          role={user.role}
          userUniversity={userUniversity}
          userInstitute={userInstitute}
          userDepartment={userDepartment}
          userGroup={userGroup}
          isEditMode={isEditMode}
          onSave={this.submit}
          setEditMode={this.setEditMode}
          setUniversity={this.setUniversity}
          setInstitute={this.setInstitute}
          setDepartment={this.setDepartment}
          universities={universities}
          institutes={institutes}
          departments={departments}
          groups={groups}
        />
        {!isEditMode && (
          <Row className="justify-content-around">
            <Col
              xs={12}
              md={{ offset: isAdmin(user) ? 8 : 4, span: 4 }}
              lg={{ offset: isAdmin(user) ? 9 : 6, span: 3 }}
            >
              <Button block variant={"red"} onClick={() => this.delete()}>
                {i18n.t("delete")}
              </Button>
            </Col>
            {!isAdmin(user) && (
              <Col xs={12} md={4} lg={3}>
                <Button
                  block
                  variant={"purple"}
                  onClick={() => this.setEditMode(true)}
                >
                  {i18n.t("edit")}
                </Button>
              </Col>
            )}
          </Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,

    userInstitute: state.instituteReducers.userInstitute,
    userDepartment: state.departmentReducers.userDepartment,
    userGroup: state.groupReducers.userGroup,
    userUniversity: state.universityReducers.userUniversity,

    institutes: state.instituteReducers.institutes,
    departments: state.departmentReducers.departments,
    groups: state.groupReducers.groups,
    universities: state.universityReducers.universities
  };
};

export default connect(mapStateToProps)(Setting);
