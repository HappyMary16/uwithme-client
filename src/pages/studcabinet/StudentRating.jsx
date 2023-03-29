import React from 'react';
import {useSelector} from 'react-redux';
import {selectedItemColor} from '../../styles/styles';
import StudCabinetPage from './components/StudCabinetPage';
import {selectCredentials} from "../../store/slices/studCabinetSlice";
import {useFetchStudentInfoQuery, useFetchStudentsRatingQuery} from "../../store/slices/studCabinetApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function StudentRating() {

  const credentials = useSelector(selectCredentials);
  const {data} = useFetchStudentsRatingQuery(credentials ? {credentials, semester: 1} : skipToken);
  const {data: studentInfo} = useFetchStudentInfoQuery(credentials ?? skipToken);

  return (
    <StudCabinetPage
      isSemesterRequired
      data={data}
      columns={[
        {
          dataField: 'place',
          text: 'N'
        },
        {
          dataField: 'fullName',
          text: 'ПІБ'
        },
        {
          dataField: 'group',
          text: 'Група',
          isNotInTiny: true
        },
        {
          dataField: 'scoreNationalShort',
          text: 'Середній бал',
          isNotInSmall: true
        },
        {
          dataField: 'scoreBologna',
          text: 'Рейтинг'
        }
      ]}
      rowStyleFunc={(row, rowIndex) => {
        if (row.studentId === studentInfo.studentId) {
          return selectedItemColor;
        }
      }}
    />
  );
}
