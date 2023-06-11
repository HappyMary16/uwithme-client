import {useState} from 'react';
import {useSelector} from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';
import {useFetchSyllabusQuery} from "../../store/studcabinet/studCabinetApiSlice";
import {selectCredentials, selectSemester} from "../../store/studcabinet/studCabinetSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function Syllabus() {

  const credentials = useSelector(selectCredentials);

  const [semester, setSemester] = useState(useSelector(selectSemester) ?? 1);
  const {data} = useFetchSyllabusQuery(credentials ? {credentials, semester: semester} : skipToken);

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
          dataField: 'control',
          text: 'Е/З'
        },
        {
          dataField: 'individualTask',
          text: 'І/З',
          isNotInTiny: true
        },
        {
          dataField: 'credit',
          text: 'Кред',
          isNotInSmall: true
        },
        {
          dataField: 'audit',
          text: 'Год',
          isNotInSmall: true
        },
        {
          dataField: 'departmentShort',
          text: 'Кафедра'
        }
      ]}
    />
  );
}
