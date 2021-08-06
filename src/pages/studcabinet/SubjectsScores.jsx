import React, { Component } from 'react';
import { loadSubjectsScores } from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import StudCabinetPage from './StudCabinetPage';

class SubjectsScores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logIdDialog: false
    };

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
        isSemesterRequired={true}
        studentInfo={studentInfo}
        data={subjectsScores}
        columns={[
          {
            dataField: 'subject',
            text: 'Дисципліна',
            sort: true
          },
          {
            dataField: 'teacher',
            text: 'Викладач',
            sort: true
          },
          {
            dataField: 'control',
            text: 'Е/З',
            sort: true
          },
          {
            dataField: 'scoreNationalShort',
            text: 'Нац',
            sort: true
          },
          {
            dataField: 'scoreBologna',
            text: 'Бал',
            sort: true
          },
          {
            dataField: 'scoreECTS',
            text: 'ECTS',
            sort: true
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
