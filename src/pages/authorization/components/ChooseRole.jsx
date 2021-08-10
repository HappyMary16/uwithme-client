import React, { Component } from "react";
import i18n from "../../../locales/i18n";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { selectorColors } from "../../../styles/styles";
import { UserRoles } from "../../../constants/userRoles";
import { connect } from "react-redux";
import { setMessage } from "../../../actions/messageAction";
import { loadInstitutes } from "../../../actions/instituteActions";
import { loadUniversities } from "../../../actions/universityActions";
import { loadDepartments } from "../../../actions/departmentActions";
import { loadGroups } from "../../../actions/groupActions";
import { signUpRequest } from "../../../actions/authActions";

class ChooseRole extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.submit = this.submit.bind(this);
    this.setRole = this.setRole.bind(this);
    this.setUniversity = this.setUniversity.bind(this);
    this.setInstitute = this.setInstitute.bind(this);
    this.setDepartment = this.setDepartment.bind(this);
  }

  componentDidMount() {
    const { universities, dispatch } = this.props;
    dispatch(loadUniversities());
    if (universities && universities.length === 1) {
      dispatch(loadInstitutes(universities[0].value));
    }
  }

  setRole(e) {
    super.setState({
      userRole: e.value,
      university: null,
      institute: null,
      department: null,
      group: null,
      universityName: null
    });
  }

  setUniversity(e) {
    const { dispatch } = this.props;
    this.setState({
      university: e,
      institute: null,
      department: null,
      group: null
    });
    dispatch(loadInstitutes(e.value));
  }

  setInstitute(e) {
    const { dispatch } = this.props;
    this.setState({
      institute: e,
      department: null,
      group: null
    });
    dispatch(loadDepartments(e.value));
  }

  setDepartment(e) {
    const { dispatch } = this.props;
    this.setState({
      department: e,
      group: null
    });
    dispatch(loadGroups(e.value));
  }

  submit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const {
      userRole,
      university,
      institute,
      department,
      group,
      universityName
    } = this.state;

    if (!userRole) {
      dispatch(setMessage(i18n.t("please_choose_your_user_type")));
    }

    if (userRole && userRole !== 3) {
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

    if (
      this.validateAdmin(userRole, universityName) ||
      this.validateUser(userRole, university, institute, department)
    ) {
      dispatch(
        signUpRequest(
          userRole,
          institute ? institute.value : null,
          department ? department.value : null,
          group ? group.value : null,
          university ? university.value : null,
          universityName
        )
      );
    }
  }

  validateAdmin(userRole, universityName) {
    return userRole === 3 && universityName;
  }

  validateUser(userRole, university, institute, department) {
    return userRole !== 3 && university && institute && department;
  }

  render() {
    const { groups, departments, institutes, universities } = this.props;
    const { userRole, university, institute, department, group } = this.state;

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
          <Form onSubmit={this.submit}>
            <Select
              className={"selector"}
              theme={selectorColors}
              placeholder={i18n.t("user_type") + " *"}
              options={UserRoles}
              onChange={this.setRole}
            />
            {userRole === 3 && (
              <Form.Control
                placeholder={i18n.t("university_name") + " *"}
                onChange={e =>
                  this.setState({ universityName: e.target.value })
                }
                required
              />
            )}
            {userRole && userRole !== 3 && (
              <div>
                <Select
                  className={"selector"}
                  theme={selectorColors}
                  placeholder={i18n.t("university") + " *"}
                  options={universities}
                  value={university}
                  onChange={this.setUniversity}
                />
                <Select
                  className={"selector"}
                  theme={selectorColors}
                  placeholder={i18n.t("institute") + " *"}
                  options={institutes}
                  value={institute}
                  onChange={this.setInstitute}
                />
                <Select
                  className={"selector"}
                  theme={selectorColors}
                  placeholder={i18n.t("department") + " *"}
                  options={departments}
                  value={department}
                  onChange={this.setDepartment}
                />
              </div>
            )}
            {userRole === 1 && (
              <Select
                className={"selector"}
                theme={selectorColors}
                placeholder={i18n.t("group")}
                options={groups}
                value={group}
                onChange={e => this.setState({ group: e })}
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
}

const mapStateToProps = state => {
  return {
    institutes: state.instituteReducers.institutes,
    departments: state.departmentReducers.departments,
    groups: state.groupReducers.groups,
    universities: state.universityReducers.universities
  };
};

export default connect(mapStateToProps)(ChooseRole);
