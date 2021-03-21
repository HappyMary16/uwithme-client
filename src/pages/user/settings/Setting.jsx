import { connect } from 'react-redux';
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i18n from '../../../locales/i18n';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loadInstitute } from '../../../actions/instituteActions';
import {
  loadUniversities,
  loadUniversity
} from '../../../actions/universityActions';
import { loadDepartment } from '../../../actions/departmentActions';
import { loadGroup } from '../../../actions/groupActions';
import { CustomSelector } from '../../common/components/CustomSelector';
import { deleteUser, updateUser } from '../../../actions/userActions';

class Setting extends Component {
  constructor(props) {
    super(props);

    const { userUniversity, userInstitute, userDepartment, userGroup, user } = this.props;
    const { firstName, lastname, surname, email } = user;

    this.state = {
      isEditMode: false,
      university: userUniversity,
      institute: userInstitute,
      department: userDepartment,
      group: userGroup,
      firstName: firstName,
      lastname: lastname,
      surname: surname,
      email: email
    };

    this.setEditMode = this.setEditMode.bind(this);
    this.submit = this.submit.bind(this);
    this.cancel = this.cancel.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    const { dispatch, user } = this.props;
    dispatch(loadUniversity());

    if (user.role && user.role !== 3) {
      dispatch(loadInstitute());
      dispatch(loadDepartment());
    }

    if (user.role === 1) {
      dispatch(loadGroup());
    }
  }

  setEditMode(isEditMode) {
    const { dispatch } = this.props;

    dispatch(loadUniversities());

    this.setState({
      isEditMode: isEditMode
    });
  }

  submit(e) {
    e.preventDefault();

    const {
      userUniversity,
      userInstitute,
      userDepartment,
      userGroup,
      user,
      dispatch
    } = this.props;

    const { university, institute, department, group, firstName, lastname, surname, email } = this.state;

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

  cancel() {
    const {
      userUniversity,
      userInstitute,
      userDepartment,
      userGroup,
      user
    } = this.props;
    const { firstName, lastname, surname, email } = user;

    this.setState({
      isEditMode: false,
      university: userUniversity,
      institute: userInstitute,
      department: userDepartment,
      group: userGroup,
      firstName: firstName,
      lastname: lastname,
      surname: surname,
      email: email
    });
  }

  delete() {
    const { dispatch } = this.props;

    dispatch(deleteUser());
  }

  render() {
    const { groups, departments, institutes, universities, user } = this.props;
    const { isEditMode, university, institute, department, group, firstName, lastname, surname, email } = this.state;
    const { role } = user;

    return (
      <Row className='justify-content-left'>
        <Col>
          <Form onSubmit={this.submit}>
            <Form.Label>{i18n.t('first_name')}</Form.Label>
            <Form.Control
              onChange={e => this.setState({ firstName: e.target.value })}
              value={firstName}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('last_name')}</Form.Label>
            <Form.Control
              onChange={e => this.setState({ lastname: e.target.value })}
              value={lastname}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('surname')}</Form.Label>
            <Form.Control
              onChange={e => this.setState({ surname: e.target.value })}
              value={surname}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('email')}</Form.Label>
            <Form.Control
              type='email'
              onChange={e => this.setState({ email: e.target.value })}
              value={email}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('university')}</Form.Label>
            <CustomSelector
              isEditMode={isEditMode}
              options={universities}
              value={university}
              onChange={value => this.setState({ university: value })}
            />
            {role && role !== 3 && (
              <div>
                <Form.Label>{i18n.t('institute')}</Form.Label>
                <CustomSelector
                  isEditMode={isEditMode}
                  options={institutes}
                  value={institute}
                  onChange={value => this.setState({ institute: value })}
                />
                <Form.Label>{i18n.t('department')}</Form.Label>
                <CustomSelector
                  isEditMode={isEditMode}
                  options={departments}
                  value={department}
                  onChange={value => this.setState({ department: value })}
                />
              </div>
            )}
            {role === 1 && (
              <div>
                <Form.Label>{i18n.t('group')}</Form.Label>
                <CustomSelector
                  isEditMode={isEditMode}
                  options={groups}
                  value={group}
                  onChange={value => this.setState({ group: value })}
                />
              </div>
            )}
            {isEditMode && (
              <Row className='justify-content-around'>
                <Col
                  xs={12}
                  md={{ offset: 4, span: 4 }}
                  lg={{ offset: 6, span: 3 }}
                  xl={{ offset: 6, span: 3 }}
                ><Button
                  block
                  variant={'purple'}
                  onClick={() => this.cancel()}
                >
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
        </Col>
      </Row>
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
