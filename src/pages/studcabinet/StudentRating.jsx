import React, { Component } from 'react';
import { loadStudentsRating } from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import { selectedItemColor } from '../../styles/styles';
import StudCabinetPage from './components/StudCabinetPage';

class StudentRating extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData(email, password, semester) {
    const { dispatch } = this.props;
    dispatch(loadStudentsRating(email, password, semester));
  }

  logIn(email, password) {
    const { dispatch } = this.props;

    dispatch(loadStudentsRating(email, password));
  }

  render() {
    const { studentInfo, studentsScores } = this.props;

    return (
      <StudCabinetPage
        isSemesterRequired
        studentInfo={studentInfo}
        data={studentsScores}
        columns={[
          {
            dataField: 'place',
            text: 'N'
          },
          {
            dataField: 'fullName',
            text: 'ПІБ'
          },
          {
            dataField: 'group',
            text: 'Група',
            isNotInTiny: true
          },
          {
            dataField: 'scoreNationalShort',
            text: 'Середній бал',
            isNotInSmall: true
          },
          {
            dataField: 'scoreBologna',
            text: 'Рейтинг'
          }
        ]}
        rowStyleFunc={(row, rowIndex) => {
          if (row.studentId === studentInfo.studentId) {
            return selectedItemColor;
          }
        }}
        logInFunc={this.logIn}
        loadDataFunc={this.loadData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    studentInfo: state.studCabinetReducers.studentInfo,
    studentsScores: state.studCabinetReducers.studentsScores
  };
};

export default connect(mapStateToProps)(StudentRating);
