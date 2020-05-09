import { connect } from 'react-redux';
import React, { Component } from 'react';
import { findUserById } from '../../../utils/UsersUtil';
import Grid from '@material-ui/core/Grid';
import { GroupCard } from '../components/GroupCard';
import { Container } from '@material-ui/core';
import { StudentsList } from '../components/StudentList';
import { loadGroupsByUniversityId } from '../../administration/structure/actions';

class GroupPage extends Component {

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    dispatch(loadGroupsByUniversityId(universityId));
  }

  render() {
    const { users, groups, groupId } = this.props;

    const group = groups
      && groups.filter(group => group.value === Number(groupId))[0];

    return (
      <Grid container xs={12}>
        <Container>
          {group && <GroupCard group={group} groupTeacher={findUserById(users, group.teacherId)}/>}

          <StudentsList students={users} addStudent={() => console.log('add student')}/>
        </Container>
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