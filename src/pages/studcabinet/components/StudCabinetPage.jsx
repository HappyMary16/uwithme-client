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
import {useDispatch, useSelector} from "react-redux";
import {selectCredentials} from "../../../store/studcabinet/studCabinetSlice";
import {useFetchStudentInfoQuery} from "../../../store/studcabinet/studCabinetApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {messageAdded} from "../../../store/message/messageSlice";
import {useTranslation} from "react-i18next";
import {selectApiLoading} from "../../../App";

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
  data,
  columns,
  rowStyleFunc,
  semester,
  setSemester
}) {

  const dispatch = useDispatch();
  const {t} = useTranslation("studCabinet");

  const isFetching = useSelector(selectApiLoading);

  const [shownColumns, setShownColumns] = useState(getColumns(columns));

  const [credentials, setCredentials] = useState(useSelector(selectCredentials));
  const {error} = useFetchStudentInfoQuery(credentials ?? skipToken);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShownColumns(getColumns(columns));
    }, true);
  }, [columns]);

  useEffect(() => {
    if (error) {
      dispatch(messageAdded(t("not_valid_credentials")));
    }
  }, [error, dispatch, t])

  return (
    <div>
      <LogInStudCabinet
        handleCreate={setCredentials}
      />

      {semester && (
        <Select
          className={'selector'}
          placeholder={i18n.t('semester')}
          theme={selectorColors}
          onChange={(e) => setSemester(e.value)}
          options={SEMESTER_NUMBER}
          defaultValue={getSemesterById(semester)}
        />
      )}

      {!data?.length && !isFetching && <EmptyPage/>}

      {!!data?.length && (
        <BootstrapTable
          rowStyle={rowStyleFunc}
          keyField={'place'}
          data={data}
          columns={shownColumns}
        />
      )}
    </div>
  );
}
