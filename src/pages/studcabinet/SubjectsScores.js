import React from 'react';
import {loadSubjectsScores} from '../../actions/studCabinetActions';
import {useDispatch, useSelector} from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';

export default function SubjectsScores() {

  const dispatch = useDispatch();

  const studentInfo = useSelector(state => state.studCabinetReducers.studentInfo);
  const subjectsScores = useSelector(state => state.studCabinetReducers.subjectsScores);

  function loadData(email, password, semester) {
    dispatch(loadSubjectsScores(email, password, semester));
  }

  return (
    <StudCabinetPage
      isSemesterRequired
      studentInfo={studentInfo}
      data={subjectsScores}
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
      loadDataFunc={loadData}
    />
  );
}
