import React, { Component } from 'react';
import { loadSubjectsScores } from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';

class SubjectsScores extends Component {
  constructor(props) {
    super(props);

    this.logIn = this.logIn.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  loadData(email, password, semester) {
    const { dispatch } = this.props;
    dispatch(loadSubjectsScores(email, password, semester));
  }

  logIn(email, password) {
    const { dispatch } = this.props;

    dispatch(loadSubjectsScores(email, password));
  }

  render() {
    const { studentInfo, subjectsScores } = this.props;

    return (
      <StudCabinetPage
        isSemesterRequired
        studentInfo={studentInfo}
        data={subjectsScores}
        columns={[
          {
            dataField: 'subject',
            text: 'Дисципліна'
          },
          {
            dataField: 'teacher',
            text: 'Викладач',
            formatter: (value, row) => {
              return value + ' (' + row.departmentShort + ')';
            },
            isNotInSmall: true
          },
          {
            dataField: 'control',
            text: 'Е/З',
            isNotInTiny: true
          },
          {
            dataField: 'scoreNationalShort',
            text: 'Нац',
            isNotInSmall: true
          },
          {
            dataField: 'scoreBologna',
            text: 'Бал'
          },
          {
            dataField: 'scoreECTS',
            text: 'ECTS',
            isNotInSmall: true
          }
        ]}
        logInFunc={this.logIn}
        loadDataFunc={this.loadData}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    studentInfo: state.studCabinetReducers.studentInfo,
    subjectsScores: state.studCabinetReducers.subjectsScores
  };
};

export default connect(mapStateToProps)(SubjectsScores);
