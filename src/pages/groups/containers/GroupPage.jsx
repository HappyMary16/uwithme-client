import { connect } from 'react-redux';
import React, { Component } from 'react';
import { findAllStudentsWithoutGroup, findUserById, findUsersByGroupId } from '../../../utils/UsersUtil';
import Grid from '@material-ui/core/Grid';
import { GroupCard } from '../components/GroupCard';
import { Container } from '@material-ui/core';
import { StudentsList } from '../components/StudentList';
import { loadGroupById } from '../../administration/structure/actions';
import {
  addStudentToGroup,
  loadStudentsByGroupId,
  loadStudentsWithoutGroupByUniversityId,
  removeStudentFromGroup
} from '../../users/actions';
import AddStudentToGroup from '../components/AddStudentToGroup';
import { RemoveStudentFromGroup } from '../components/RemoveStudentFromGroup';

class GroupPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      openAddStudentDialog: false,
      openRemoveStudentDialog: false,
      studentToRemove: undefined
    };

    this.removeStudent = this.removeStudent.bind(this);
    this.loadStudentsAndOpenAddDialog = this.loadStudentsAndOpenAddDialog.bind(this);
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
      dispatch(loadStudentsWithoutGroupByUniversityId(universityId));
    }
    this.setState({ openAddStudentDialog: true });
  }

  addStudentToGroup(studentIds) {
    const { dispatch, groupId } = this.props;
    dispatch(addStudentToGroup(studentIds, groupId));
  }

  render() {
    const { users, groups, groupId } = this.props;
    const { openAddStudentDialog, openRemoveStudentDialog, studentToRemove } = this.state;

    const group = groups
      && groups.filter(group => group.value === Number(groupId))[0];

    return (
      <Grid container xs={12}>
        <Container>
          {group && <GroupCard group={group} groupTeacher={findUserById(users, group.teacherId)}/>}

          <StudentsList students={findUsersByGroupId(users, groupId)}
                        addStudent={this.loadStudentsAndOpenAddDialog}
                        removeStudent={this.openRemoveStudentDialog}/>
        </Container>
        <AddStudentToGroup open={openAddStudentDialog}
                           students={findAllStudentsWithoutGroup(users)}
                           handleClose={() => this.setState({ openAddStudentDialog: false })}
                           handleAdd={this.addStudentToGroup}/>
        <RemoveStudentFromGroup open={openRemoveStudentDialog}
                                student={studentToRemove}
                                handleNo={() => {
                                  this.setState(
                                    {
                                      openRemoveStudentDialog: false,
                                      studentToRemove: undefined
                                    });
                                }}
                                handleYes={this.removeStudent}/>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.usersReducer.users,
    lessons: state.usersReducer.lessons,
    groups: state.adminReducers.groups,

    universityId: state.authReducers.user.universityId
  };
};

export default connect(mapStateToProps)(GroupPage);