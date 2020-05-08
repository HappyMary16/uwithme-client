import { connect } from 'react-redux';
import React, { Component } from 'react';
import { findUserById } from '../../../utils/UsersUtil';
import Grid from '@material-ui/core/Grid';
import { GroupCard } from '../components/GroupCard';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(2, 0, 0, 2)
  },
  image: {
    width: 200,
    height: 200
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%'
  }
}));

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

    return (
      <Grid container xs={12}>
        <Container>
          <GroupCard group={group} groupTeacher={teacher}/>
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