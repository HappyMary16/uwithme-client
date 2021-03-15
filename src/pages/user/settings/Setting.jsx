import { connect } from 'react-redux';
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i18n from '../../../locales/i18n';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import { selectorColors } from '../../../styles/styles';
import Button from 'react-bootstrap/Button';
import { loadInstitute } from '../../../actions/instituteActions';
import { loadUniversity } from '../../../actions/universityActions';
import { loadDepartment } from '../../../actions/departmentActions';
import { loadGroup } from '../../../actions/groupActions';

class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditMode: false
    };

    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.endEditing = this.endEditing.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.openDeleteLessonDialog = this.openDeleteLessonDialog.bind(this);
    this.closeDeleteLessonDialog = this.closeDeleteLessonDialog.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);
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

  render() {
    const { groups, departments, institutes, universities, user } = this.props;
    const { isEditMode } = this.state;
    const { role, university, institute, department, group } = user;

    return (
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} xl={5}>
          <Form onSubmit={this.submit}>
            <Form.Label>{i18n.t('first_name')}</Form.Label>
            <Form.Control
              onChange={e => this.setState({ universityName: e.target.value })}
              defaultValue={user.firstName}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('last_name')}</Form.Label>
            <Form.Control
              onChange={e => this.setState({ universityName: e.target.value })}
              defaultValue={user.lastname}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('surname')}</Form.Label>
            <Form.Control
              onChange={e => this.setState({ universityName: e.target.value })}
              defaultValue={user.surname}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('email')}</Form.Label>
            <Form.Control
              type="email"
              onChange={e => this.setState({ universityName: e.target.value })}
              defaultValue={user.email}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('password')}</Form.Label>
            <Form.Control
              type="password"
              onChange={e => this.setState({ universityName: e.target.value })}
              defaultValue={user.password}
              required
              readOnly={!isEditMode}
            />
            <Form.Label>{i18n.t('university')}</Form.Label>
            <Select
              className={'selector'}
              theme={selectorColors}
              options={universities}
              value={university}
              onChange={this.setUniversity}
            />
            {role && role !== 3 && (
              <div>
                <Form.Label>{i18n.t('institute')}</Form.Label>
                <Select
                  className={'selector'}
                  theme={selectorColors}
                  options={institutes}
                  value={institute}
                  onChange={this.setInstitute}
                />
                <Form.Label>{i18n.t('department')}</Form.Label>
                <Select
                  className={'selector'}
                  theme={selectorColors}
                  options={departments}
                  value={department}
                  onChange={this.setDepartment}
                />
              </div>
            )}
            {role === 1 && (
              <div>
                <Form.Label>{i18n.t('group')}</Form.Label>
                <Select
                  className={'selector'}
                  theme={selectorColors}
                  options={groups}
                  value={group}
                  onChange={e => this.setState({ group: e })}
                />
              </div>
            )}
            {isEditMode && (
              <Button block variant={'purple'} type={'submit'}>
                {i18n.t('save')}
              </Button>
            )}
          </Form>
          {!isEditMode && (
            <div>
              <Button block variant={'purple'} type={'submit'}>
                {i18n.t('edit')}
              </Button>
              <Button block variant={'red'} type={'submit'}>
                {i18n.t('delete')}
              </Button>
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
