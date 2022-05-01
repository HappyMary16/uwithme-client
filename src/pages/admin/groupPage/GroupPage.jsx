import { connect } from 'react-redux';
import React, { Component } from 'react';
import { findAllStudentsWithoutGroup, findUserById, findUsersByGroupId } from '../../../utils/UsersUtil';
import { GroupCard } from './components/GroupCard';
import { StudentsList } from './components/StudentList';
import AddStudentToGroup from './components/AddStudentToGroup';
import { RemoveStudentFromGroup } from './components/RemoveStudentFromGroup';
import { Container } from 'react-bootstrap';
import { loadGroupById } from '../../../actions/groupActions';
import {
  addStudentToGroup,
  loadStudentsByGroupId,
  loadStudentsWithoutGroup,
  removeStudentFromGroup
} from '../../../actions/userActions';
import { withGroupId } from '../../../utils/RouterUtils';

class GroupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAddStudentDialog: false,
      openRemoveStudentDialog: false,
      studentToRemove: undefined
    };

    this.removeStudent = this.removeStudent.bind(this);
    this.loadStudentsAndOpenAddDialog = this.loadStudentsAndOpenAddDialog.bind(
      this
    );
    this.addStudentToGroup = this.addStudentToGroup.bind(this);
    this.openRemoveStudentDialog = this.openRemoveStudentDialog.bind(this);
  }

  componentDidMount() {
    const { dispatch, groupId } = this.props;
    if (groupId) {
      dispatch(loadGroupById(groupId));
      dispatch(loadStudentsByGroupId(groupId));
    }
  }

  openRemoveStudentDialog(student) {
    this.setState({
      openRemoveStudentDialog: true,
      studentToRemove: student
    });
  }

  removeStudent(studentId) {
    const { dispatch } = this.props;
    dispatch(removeStudentFromGroup(studentId));
  }

  loadStudentsAndOpenAddDialog() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadStudentsWithoutGroup());
    }
    this.setState({ openAddStudentDialog: true });
  }

  addStudentToGroup(studentIds) {
    const { dispatch, groupId } = this.props;
    dispatch(addStudentToGroup(studentIds, groupId));
  }

  render() {
    const { users, group, department, institute, groupId } = this.props;
    const {
      openAddStudentDialog,
      openRemoveStudentDialog,
      studentToRemove
    } = this.state;

    return (
      <div>
        <Container>
          {group && (
            <GroupCard
              group={group}
              department={department}
              institute={institute}
              groupTeacher={findUserById(users, group.teacherId)}
            />
          )}

          <StudentsList
            students={findUsersByGroupId(users, groupId)}
            addStudent={this.loadStudentsAndOpenAddDialog}
            removeStudent={this.openRemoveStudentDialog}
          />
        </Container>
        <AddStudentToGroup
          open={openAddStudentDialog}
          students={findAllStudentsWithoutGroup(users)}
          handleClose={() => this.setState({ openAddStudentDialog: false })}
          handleAdd={this.addStudentToGroup}
        />
        <RemoveStudentFromGroup
          open={openRemoveStudentDialog}
          student={studentToRemove}
          handleNo={() => {
            this.setState({
              openRemoveStudentDialog: false,
              studentToRemove: undefined
            });
          }}
          handleYes={this.removeStudent}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  let groupId = state.router.location.pathname.split('/').pop();
  let group = state.groupReducers.groups[groupId];
  let department = state.departmentReducers.departments[group.departmentId];

  return {
    users: Object.values(state.userReducers.users),

    groupId,
    group,
    department,
    institute: state.instituteReducers.institutes[department.instituteId],

    universityId: state.authReducers.user.universityId
  };
};

export default withGroupId(connect(mapStateToProps)(GroupPage));
