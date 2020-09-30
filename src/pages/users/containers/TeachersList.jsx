import { connect } from 'react-redux';
import React, { Component } from 'react';
import { loadTeachersByGroupId } from '../actions';
import List from '@material-ui/core/List';
import { TeacherListItem } from '../components/TeacherListItem';

class TeachersList extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadTeachersByGroupId());
  }

  render() {
    const { teachers } = this.props;

    return (
      <List>
        {teachers && teachers.map(teacher => <TeacherListItem key={teacher.id} teacher={teacher}/>)}
      </List>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    teachers: state.usersReducer.users
  };
};

export default connect(mapStateToProps)(TeachersList);