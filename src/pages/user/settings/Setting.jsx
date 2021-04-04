import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import i18n from '../../../locales/i18n';
import Button from 'react-bootstrap/Button';
import { loadUniversities, loadUniversity } from '../../../actions/universityActions';
import { deleteUser, updateUser } from '../../../actions/userActions';
import EditSetting from './EditSetting';
import { loadInstitute, loadInstitutes } from '../../../actions/instituteActions';
import { loadDepartment, loadDepartments } from '../../../actions/departmentActions';
import { loadGroup, loadGroups } from '../../../actions/groupActions';
import { connect } from 'react-redux';

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
    const { dispatch } = this.props;

    dispatch(loadUniversity());
    dispatch(loadInstitute());
    dispatch(loadDepartment());
    dispatch(loadGroup());

    dispatch(loadUniversities());
  }

  setEditMode(isEditMode) {
    if (isEditMode) {
      const {
        userUniversity,
        userInstitute,
        userDepartment,
        user,
        dispatch
      } = this.props;

      //TODO fix it
      if (user.role && user.role !== 3) {
        dispatch(loadInstitutes(userUniversity.value));
        dispatch(loadDepartments(userInstitute.value));
      }

      if (user.role === 1) {
        dispatch(loadGroups(userDepartment.value));
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

    const { university, institute, department, group, firstName, lastname, surname, email } = userToUpdate;

    if (user && (university !== userUniversity
      || institute !== userInstitute
      || department !== userDepartment
      || group !== userGroup
      || user.firstName !== firstName
      || user.lastname !== lastname
      || user.surname !== surname
      || user.email !== email)) {

      dispatch(updateUser(university, institute, department, group, firstName, lastname, surname, email));
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
        <EditSetting user={user}
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
          <div>
            <Col
              xs={12}
              md={{ offset: 9, span: 3 }}
              lg={{ offset: 9, span: 3 }}
              xl={{ offset: 10, span: 2 }}
            >
              <Button
                block
                variant={'purple'}
                onClick={() => this.setEditMode(true)}
              >
                {i18n.t('edit')}
              </Button>
            </Col>
            <Col
              xs={12}
              md={{ offset: 9, span: 3 }}
              lg={{ offset: 9, span: 3 }}
              xl={{ offset: 10, span: 2 }}
            >
              <Button block variant={'red'} onClick={() => this.delete()}>
                {i18n.t('delete')}
              </Button>
            </Col>
          </div>
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
