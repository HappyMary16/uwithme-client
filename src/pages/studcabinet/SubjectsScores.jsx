import React, { Component } from 'react';
import { loadSubjectsScores } from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import BootstrapTable from 'react-bootstrap-table-next';
import { LogInStudCabinet } from './components/LogInStudCabinet';
import { EmptyPage } from '../common/components/EmptyPage';
import i18n from '../../locales/i18n';
import { selectedItemColor, selectorColors } from '../../styles/styles';
import { getSemesterById } from '../../utils/StructureUtils';
import Select from 'react-select';
import { SEMESTER_NUMBER } from '../../constants/userRoles';

class SubjectsScores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logIdDialog: false
    };

    this.logIn = this.logIn.bind(this);
    this.setSemester = this.setSemester.bind(this);
    this.isAuthorizeInStudCab = this.isAuthorizeInStudCab.bind(this);
  }

  componentDidMount() {
    const { dispatch, studentInfo } = this.props;

    if (this.isAuthorizeInStudCab(studentInfo)) {
      const { email, password, semester } = studentInfo;
      dispatch(loadSubjectsScores(email, password, semester));
    }
  }

  logIn(email, password) {
    const { dispatch } = this.props;

    dispatch(loadSubjectsScores(email, password));
  }

  setSemester(e) {
    const { dispatch, studentInfo } = this.props;
    const { email, password } = studentInfo;
    const semester = e.value;

    dispatch(loadSubjectsScores(email, password, semester));

    this.setState({
      ...this.state,
      semester
    });
  }

  isAuthorizeInStudCab() {
    const { studentInfo } = this.props;

    return (
      !!studentInfo &&
      !!studentInfo.email &&
      !!studentInfo.password &&
      !!studentInfo.semester
    );
  }

  render() {
    const { studentInfo, subjectsScores } = this.props;
    let { semester } = this.state;

    if (!semester && studentInfo) {
      semester = studentInfo.semester;
    }

    return (
      <div>
        <LogInStudCabinet
          open={!this.isAuthorizeInStudCab(studentInfo)}
          handleCreate={this.logIn}
        />

        {!!semester && (
          <Select
            className={'selector'}
            placeholder={i18n.t('semester')}
            theme={selectorColors}
            onChange={this.setSemester}
            options={SEMESTER_NUMBER}
            defaultValue={getSemesterById(semester)}
          />
        )}

        {(!subjectsScores ||
          !semester ||
          !subjectsScores[semester] ||
          subjectsScores[semester].length === 0) && <EmptyPage />}

        {!!subjectsScores &&
          !!semester &&
          !!subjectsScores[semester] &&
          subjectsScores[semester].length !== 0 && (
            <BootstrapTable
              rowStyle={(row, rowIndex) => {
                if (row.studentId === studentInfo.studentId) {
                  return selectedItemColor;
                }
              }}
              keyField={'place'}
              data={subjectsScores[semester]}
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
            />
          )}
      </div>
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
