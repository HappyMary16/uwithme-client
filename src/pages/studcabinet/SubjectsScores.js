import React from 'react';
import {useSelector} from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';
import {useFetchStudentScoresQuery} from "../../store/slices/studCabinetApiSlice";
import {selectCredentials} from "../../store/slices/studCabinetSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function SubjectsScores() {

  const credentials = useSelector(selectCredentials);
  const {data} = useFetchStudentScoresQuery(credentials ? {credentials, semester: 1} : skipToken);

  return (
    <StudCabinetPage
      isSemesterRequired
      data={data}
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
    />
  );
}
