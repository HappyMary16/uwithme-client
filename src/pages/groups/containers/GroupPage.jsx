import { connect } from 'react-redux';
import React, { Component } from 'react';
import { findUserById } from '../../../utils/UsersUtil';
import Grid from '@material-ui/core/Grid';
import { GroupCard } from '../components/GroupCard';
import { Container } from '@material-ui/core';
import { StudentsList } from '../components/StudentList';

class GroupPage extends Component {

  constructor(props) {
    super(props);
    // const group = props.groups
    //   && props.groups.filter(group => group.value === props.groupId)[0];

    this.state = {
      // group: group,
      group: {
        id: props.groupId,
        name: 'name',
        institute: 'institute',
        department: 'department',
        teacherId: 2,
        isShowingInRegistration: true
      },
      // teacher: findUserById(props.users, group.teacherId)
      teacher: findUserById(props.users, 2)
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  render() {
    const { group, teacher } = this.state;
    const { users } = this.props;

    return (
      <Grid container xs={12}>
        <Container>
          <GroupCard group={group} groupTeacher={teacher}/>

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
    groups: state.usersReducer.groups
  };
};

export default connect(mapStateToProps)(GroupPage);