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
            formatter: (value, row) => {
              if (isPageSmall()) {
                return value + ' (' + row.teacher + ')';
              }
              return value;
            },
            text: 'Дисципліна',
            isAlwaysRequired: true
          },
          {
            dataField: 'teacher',
            text: 'Викладач'
          },
          {
            dataField: 'control',
            text: 'Е/З',
            isRequired: true
          },
          {
            dataField: 'course',
            text: 'Курс',
            isAlwaysRequired: true
          },
          {
            dataField: 'semester',
            text: 'Сем.',
            isAlwaysRequired: true
          },
          {
            dataField: 'individualTask',
            text: 'І/З'
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
