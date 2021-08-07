import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { LogInStudCabinet } from './LogInStudCabinet';
import { EmptyPage } from '../../common/components/EmptyPage';
import i18n from '../../../locales/i18n';
import { selectorColors } from '../../../styles/styles';
import { getSemesterById } from '../../../utils/StructureUtils';
import Select from 'react-select';
import { SEMESTER_NUMBER } from '../../../constants/userRoles';

// Props:
// isSemesterRequired
// data
// columns
// rowStyleFunc
// loadDataFunc
// logInFunc
// studentInfo
class StudCabinetPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logIdDialog: false
    };

    this.setSemester = this.setSemester.bind(this);
    this.isAuthorizeInStudCab = this.isAuthorizeInStudCab.bind(this);
  }

  componentDidMount() {
    const { studentInfo, loadDataFunc } = this.props;

    if (this.isAuthorizeInStudCab(studentInfo)) {
      const { email, password, semester } = studentInfo;
      loadDataFunc(email, password, semester);
    }
  }

  setSemester(e) {
    const { loadDataFunc, studentInfo } = this.props;
    const { email, password } = studentInfo;
    const semester = e.value;

    loadDataFunc(email, password, semester);

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

  ifDataPresent(semester) {
    const { data, isSemesterRequired } = this.props;

    if (isSemesterRequired) {
      return (
        !!data && !!semester && !!data[semester] && data[semester].length !== 0
      );
    } else {
      return !!data && data.length !== 0;
    }
  }

  getData(semester) {
    const { data, isSemesterRequired } = this.props;

    if (isSemesterRequired) {
      return !!data && data[semester];
    } else {
      return data;
    }
  }

  render() {
    const {
      studentInfo,
      logInFunc,
      rowStyleFunc,
      columns,
      isSemesterRequired
    } = this.props;
    let { semester } = this.state;

    if (!semester && studentInfo) {
      semester = studentInfo.semester;
    }

    return (
      <div>
        <LogInStudCabinet
          open={!this.isAuthorizeInStudCab(studentInfo)}
          handleCreate={logInFunc}
        />

        {isSemesterRequired && !!semester && (
          <Select
            className={'selector'}
            placeholder={i18n.t('semester')}
            theme={selectorColors}
            onChange={this.setSemester}
            options={SEMESTER_NUMBER}
            defaultValue={getSemesterById(semester)}
          />
        )}

        {!this.ifDataPresent(semester) && <EmptyPage />}

        {this.ifDataPresent(semester) && (
          <BootstrapTable
            rowStyle={rowStyleFunc}
            keyField={'place'}
            data={this.getData(semester)}
            columns={columns}
          />
        )}
      </div>
    );
  }
}

export default StudCabinetPage;