import React from 'react';
import {loadStudentsRating} from '../../actions/studCabinetActions';
import {useDispatch, useSelector} from 'react-redux';
import {selectedItemColor} from '../../styles/styles';
import StudCabinetPage from './components/StudCabinetPage';

export default function StudentRating() {
  const dispatch = useDispatch();

  const studentInfo = useSelector(state => state.studCabinetReducers.studentInfo);
  const studentsScores = useSelector(state => state.studCabinetReducers.studentsScores);

  function loadData(email, password, semester) {
    dispatch(loadStudentsRating(email, password, semester));
  }

  return (
    <StudCabinetPage
      isSemesterRequired
      studentInfo={studentInfo}
      data={studentsScores}
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
      loadDataFunc={loadData}
    />
  );
}
