import {useState} from 'react';
import {useSelector} from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';
import {useFetchStudentScoresQuery} from "../../store/studcabinet/studCabinetApiSlice";
import {selectCredentials, selectSemester} from "../../store/studcabinet/studCabinetSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function SubjectsScores() {

  const credentials = useSelector(selectCredentials);

  const [semester, setSemester] = useState(useSelector(selectSemester) ?? 1);
  const {data} = useFetchStudentScoresQuery(credentials ? {credentials, semester: semester} : skipToken);

  return (
    <StudCabinetPage
      semester={semester}
      setSemester={setSemester}
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
