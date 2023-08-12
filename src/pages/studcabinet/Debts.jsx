import {useSelector} from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';
import {selectCredentials} from "../../store/studcabinet/studCabinetSlice";
import {useFetchStudentDebtsQuery} from "../../store/studcabinet/studCabinetApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function Debts() {

  const credentials = useSelector(selectCredentials);
  const {data} = useFetchStudentDebtsQuery(credentials ?? skipToken);

  return (
    <StudCabinetPage
      data={data}
      columns={[
        {
          dataField: 'subject',
          text: 'Дисципліна'
        },
        {
          dataField: 'teacher',
          text: 'Викладач',
          isNotInSmall: true
        },
        {
          dataField: 'control',
          text: 'Е/З',
          isNotInTiny: true
        },
        {
          dataField: 'course',
          text: 'Курс'
        },
        {
          dataField: 'semester',
          text: 'Сем.'
        },
        {
          dataField: 'individualTask',
          text: 'І/З',
          isNotInSmall: true
        }
      ]}
    />
  );
}