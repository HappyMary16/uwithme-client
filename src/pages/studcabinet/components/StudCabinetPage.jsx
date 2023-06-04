import React, {useEffect, useState} from 'react';
import BootstrapTable from "@happymary16/react-bootstrap-table-next";
import {LogInStudCabinet} from './LogInStudCabinet';
import {EmptyPage} from '../../common/components/EmptyPage';
import i18n from '../../../config/i18n';
import {selectorColors} from '../../../styles/styles';
import {getSemesterById} from '../../../utils/StructureUtils';
import Select from 'react-select';
import {SEMESTER_NUMBER} from '../../../constants/userRoles';
import {isPageSmall, isPageTiny} from '../../../utils/PageSizeUtil';
import {useSelector} from "react-redux";
import {selectCredentials} from "../../../store/studcabinet/studCabinetSlice";
import {useFetchStudentInfoQuery} from "../../../store/studcabinet/studCabinetApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

function getColumns(columns) {
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

export default function StudCabinetPage({
  isSemesterRequired,
  data,
  columns,
  rowStyleFunc
}) {

  const [shownColumns, setShownColumns] = useState(getColumns(columns));
  const [semester, setSemester] = useState(1);

  const [credentials, setCredentials] = useState(useSelector(selectCredentials));
  useFetchStudentInfoQuery(credentials ?? skipToken);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShownColumns(getColumns(columns));
    }, true);
  }, [columns]);

  function ifDataPresent(semester) {
    if (isSemesterRequired) {
      return (!!semester && data
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
        handleCreate={setCredentials}
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
