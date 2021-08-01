import React, { Component } from 'react';
import {
  loadStudentsRating,
  renderStudentInfo
} from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { LogInStudCabinet } from './components/LogInStudCabinet';

class StudentRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logIdDialog: false
    };

    this.setLogInDialog = this.setLogInDialog.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentDidMount() {
    const { dispatch, studentInfo } = this.props;
    const { email, password, semester } = studentInfo;

    if (!email || !password || !semester) {
      this.setState({
        ...this.state,
        logIdDialog: true
      });
    } else {
      dispatch(loadStudentsRating(email, password, semester));
    }
  }

  setLogInDialog(logIdDialogValue) {
    this.setState({
      ...this.state,
      logIdDialog: logIdDialogValue
    });
  }

  logIn(email, password) {
    const { dispatch } = this.props;

    dispatch(renderStudentInfo(email, password, 10));
    dispatch(loadStudentsRating(email, password, 10));
  }

  render() {
    const { studentInfo, studentsScores } = this.props;
    const { logIdDialog } = this.state;

    return (
      <div>
        <LogInStudCabinet
          open={logIdDialog}
          handleCreate={this.logIn}
          handleClose={() => this.setLogInDialog(false)}
        />

        {!!studentsScores &&
          !!studentInfo.semester &&
          !!studentsScores[studentInfo.semester] && (
            <BootstrapTable
              keyField={'place'}
              data={studentsScores[studentInfo.semester]}
              columns={[
                {
                  dataField: 'place',
                  text: 'N',
                  sort: true
                },
                {
                  dataField: 'fullName',
                  text: 'ПІБ',
                  sort: true
                },
                {
                  dataField: 'group',
                  text: 'Група',
                  sort: true
                },
                {
                  dataField: 'scoreNationalShort',
                  text: 'Нац',
                  sort: true
                },
                {
                  dataField: 'scoreBologna',
                  text: 'Рейтинг',
                  sort: true
                }
              ]}
            />
          )}
      </div>
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
