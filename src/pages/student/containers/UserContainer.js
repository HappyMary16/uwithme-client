import { connect } from 'react-redux';
import { User } from '../components/User';

function createData(time, name) {
  return { time, name };
}

const rows = [
  createData('10:25-12:00', 'History'),
  createData('12:35-14:10', 'Java')
];

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    schedules: rows
  };
};

const UserContainer = connect(mapStateToProps)(User);

export default UserContainer;
