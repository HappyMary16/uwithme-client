import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectedItemColor} from '../../styles/styles';
import StudCabinetPage from './components/StudCabinetPage';
import {selectCredentials, selectSemester} from "../../store/studcabinet/studCabinetSlice";
import {useFetchStudentInfoQuery, useFetchStudentsRatingQuery} from "../../store/studcabinet/studCabinetApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function StudentRating() {

  const credentials = useSelector(selectCredentials);
  const [semester, setSemester] = useState(useSelector(selectSemester) ?? 1);
  const {data} = useFetchStudentsRatingQuery(credentials ? {credentials, semester: semester} : skipToken);
  const {data: studentInfo} = useFetchStudentInfoQuery(credentials ?? skipToken);

  return (
    <StudCabinetPage
      semester={semester}
      setSemester={setSemester}
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
