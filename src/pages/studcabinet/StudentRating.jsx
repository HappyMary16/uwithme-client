import React, { Component } from 'react';
import { loadStudentsRating } from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { LogInStudCabinet } from './components/LogInStudCabinet';
import { EmptyPage } from '../common/components/EmptyPage';
import i18n from '../../locales/i18n';
import { selectedItemColor, selectorColors } from '../../styles/styles';
import { getSemesterById } from '../../utils/StructureUtils';
import Select from 'react-select';
import { SEMESTER_NUMBER } from '../../constants/userRoles';

class StudentRating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logIdDialog: false
    };

    this.setLogInDialog = this.setLogInDialog.bind(this);
    this.logIn = this.logIn.bind(this);
    this.setSemester = this.setSemester.bind(this);
  }

  componentDidMount() {
    const { dispatch, studentInfo } = this.props;
    const { email, password } = studentInfo;

    if (!email || !password) {
      this.setState({
        ...this.state,
        logIdDialog: true
      });
    } else {
      dispatch(loadStudentsRating(email, password));
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

    dispatch(loadStudentsRating(email, password));
    this.setLogInDialog(false);
  }

  setSemester(e) {
    const { dispatch, studentInfo } = this.props;
    const { email, password } = studentInfo;
    const semester = e.value;

    dispatch(loadStudentsRating(email, password, semester));

    this.setState({
      ...this.state,
      semester
    });
  }

  render() {
    const { studentInfo, studentsScores } = this.props;
    let { logIdDialog, semester } = this.state;

    if (!semester && studentInfo) {
      semester = studentInfo.semester;
    }

    const sortingHeaderStyle = {
      backgroundColor: 'red'
    };

    return (
      <div>
        <LogInStudCabinet
          open={logIdDialog}
          handleCreate={this.logIn}
          handleClose={() => this.setLogInDialog(false)}
        />

        <Select
          className={'selector'}
          placeholder={i18n.t('semester')}
          theme={selectorColors}
          onChange={this.setSemester}
          options={SEMESTER_NUMBER}
          defaultValue={getSemesterById(semester)}
        />

        {(!studentsScores ||
          !semester ||
          !studentsScores[semester] ||
          studentsScores[semester].length === 0) && <EmptyPage />}

        {!!studentsScores &&
          !!semester &&
          !!studentsScores[semester] &&
          studentsScores[semester].length !== 0 && (
            <BootstrapTable
              rowStyle={(row, rowIndex) => {
                if (row.studentId === studentInfo.studentId) {
                  return selectedItemColor;
                }
              }}
              keyField={'place'}
              data={studentsScores[semester]}
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
                  text: 'Середній бал',
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
