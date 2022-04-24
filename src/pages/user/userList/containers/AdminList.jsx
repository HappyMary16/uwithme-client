import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getAdmins } from '../../../../utils/UsersUtil';
import { loadUsersByRole, unAssignRole } from '../../../../actions/userActions';
import { EmptyPage } from '../../../common/components/EmptyPage';
import { ListGroup } from 'react-bootstrap';
import { AdminListItem } from '../components/AdminListItem';
import { ADMIN } from '../../../../constants/userRoles';

class AdminsList extends Component {

  constructor(props) {
    super(props);

    this.deleteAdminFunc = this.deleteAdminFunc.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(loadUsersByRole(ADMIN));
  }

  deleteAdminFunc(userId) {
    const { dispatch } = this.props;
    dispatch(unAssignRole(userId, ADMIN));
  }

  render() {
    const { users, isFetching, userId } = this.props;

    return (
      <ListGroup variant={'flush'}>
        <EmptyPage list={users} isFetching={isFetching} />
        {users &&
        users.map(user => (
          <AdminListItem key={user.id}
                         user={user}
                         deleteAdminFunc={this.deleteAdminFunc}
                         isDeletePresent={user.id !== userId}/>
        ))}
      </ListGroup>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.authReducers.user.id,
    users: getAdmins(state.userReducers.users),
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(AdminsList);
