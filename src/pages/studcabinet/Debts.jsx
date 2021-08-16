import React, { Component } from 'react';
import { loadDebts } from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';
import { isPageSmall } from '../../utils/PageSizeUtil';

class Debts extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
  }

  loadData(email, password) {
    const { dispatch } = this.props;
    dispatch(loadDebts(email, password));
  }

  render() {
    const { studentInfo, debts } = this.props;

    return (
      <StudCabinetPage
        studentInfo={studentInfo}
        data={debts}
        logInFunc={this.loadData}
        loadDataFunc={this.loadData}

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
}

const mapStateToProps = state => {
  return {
    studentInfo: state.studCabinetReducers.studentInfo,
    debts: state.studCabinetReducers.debts
  };
};

export default connect(mapStateToProps)(Debts);
