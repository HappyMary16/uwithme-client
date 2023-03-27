import React, {useEffect, useState} from 'react';
import BootstrapTable from '@musicstory/react-bootstrap-table-next';
import {LogInStudCabinet} from './LogInStudCabinet';
import {EmptyPage} from '../../common/components/EmptyPage';
import i18n from '../../../locales/i18n';
import {selectorColors} from '../../../styles/styles';
import {getSemesterById} from '../../../utils/StructureUtils';
import Select from 'react-select';
import {SEMESTER_NUMBER} from '../../../constants/userRoles';
import {isPageSmall, isPageTiny} from '../../../utils/PageSizeUtil';

export default function StudCabinetPage({
  isSemesterRequired,
  data,
  columns,
  rowStyleFunc,
  loadDataFunc,
  studentInfo
}) {

  const [shownColumns, setShownColumns] = useState(getColumns());
  const [semester, setSemester] = useState(studentInfo?.semester);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShownColumns(getColumns());
    }, true);
  }, [columns]);

  useEffect(() => {
    if (isAuthorizeInStudCab(studentInfo)) {
      const {email, password} = studentInfo ?? {};
      loadDataFunc(email, password, semester);
    }
  }, [studentInfo, semester, loadDataFunc]);

  function getColumns() {
    let columnsToShow = columns;

    if (isPageSmall()) {
      columnsToShow = columnsToShow && columnsToShow.filter(column => !column.isNotInSmall);
    }

    if (isPageTiny()) {
      columnsToShow = columnsToShow && columnsToShow.filter(column => !column.isNotInTiny);
    }

    columnsToShow.forEach(columnsToShow => columnsToShow.sort = true);
    return columnsToShow;
  }

  function isAuthorizeInStudCab() {
    return (
      !!studentInfo &&
      !!studentInfo.email &&
      !!studentInfo.password &&
      !!studentInfo.semester
    );
  }

  function ifDataPresent(semester) {
    if (isSemesterRequired) {
      return (!!semester
        && data.filter(studentScore => studentScore.semester === semester).length > 0);
    } else {
      return !!data && data.length > 0;
    }
  }

  function getData(semester) {
    if (isSemesterRequired) {
      return (!!data
        && data.filter(studentScore => studentScore.semester === semester));
    } else {
      return data;
    }
  }

  return (
    <div>
      <LogInStudCabinet
        open={!isAuthorizeInStudCab(studentInfo)}
        handleCreate={loadDataFunc}
      />

      {isSemesterRequired && !!semester && (
        <Select
          className={'selector'}
          placeholder={i18n.t('semester')}
          theme={selectorColors}
          onChange={(e) => setSemester(e.value)}
          options={SEMESTER_NUMBER}
          defaultValue={getSemesterById(semester)}
        />
      )}

      {!ifDataPresent(semester) && <EmptyPage/>}

      {ifDataPresent(semester) && (
        <BootstrapTable
          rowStyle={rowStyleFunc}
          keyField={'place'}
          data={getData(semester)}
          columns={shownColumns}
        />
      )}
    </div>
  );
}
