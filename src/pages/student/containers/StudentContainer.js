import { connect } from 'react-redux';
import { Student } from '../components/Student';

function createData(time, name) {
  return { time, name };
}

const rows = [
  createData('10:25-12:00', 'History'),
  createData('12:35-14:10', 'Java')
];

const mapStateToProps = state => {
  return {
    student: {
      name: 'name',
      lastName: 'last name',
      institute: 'institute',
      department: 'department',
      group: 'group',
      email: 'email'
    },
    schedules: rows
  };
};

const StudentContainer = connect(mapStateToProps)(Student);

export default StudentContainer;
