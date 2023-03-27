import React from 'react';
import {loadDebts, loadStudentsRating} from '../../actions/studCabinetActions';
import {useDispatch, useSelector} from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';

export default function Debts() {

  const dispatch = useDispatch();

  const studentInfo = useSelector(state => state.studCabinetReducers.studentInfo);
  const debts = useSelector(state => state.studCabinetReducers.debts);

  function loadData(email, password) {
    dispatch(loadDebts(email, password));
  }

  return (
    <StudCabinetPage
      studentInfo={studentInfo}
      data={debts}
      loadDataFunc={loadData}
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