import React, { Component } from 'react';
import { loadDebts } from '../../actions/studCabinetActions';
import { connect } from 'react-redux';
import StudCabinetPage from './components/StudCabinetPage';

class Debts extends Component {
  constructor(props) {
    super(props);

    this.loadData = this.loadData.bind(this);
  }

  loadData(email, password) {
    const { dispatch } = this.props;
    console.log();
    dispatch(loadDebts(email, password));
  }

  render() {
    const { studentInfo, debts } = this.props;

    return (
      <StudCabinetPage
        studentInfo={studentInfo}
        data={debts}
        columns={[
          {
            dataField: 'subject',
            text: 'Дисципліна',
            sort: true
          },
          {
            dataField: 'teacher',
            text: 'Викладач',
            sort: true
          },
          {
            dataField: 'control',
            text: 'Е/З',
            sort: true
          },
          {
            dataField: 'course',
            text: 'Курс',
            sort: true
          },
          {
            dataField: 'semester',
            text: 'Семестр',
            sort: true
          },
          {
            dataField: 'individualTask',
            text: 'І/З',
            sort: true
          }
        ]}
        logInFunc={this.loadData}
        loadDataFunc={this.loadData}
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
