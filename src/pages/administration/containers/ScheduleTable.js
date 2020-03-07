import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Select from 'react-select';

const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#483D8B',
    primary50: '#D3D3D3',
    primary25: '#F5F5F5'
  }
});

const groupSelect = {
  marginTop: '20px'
};

let selectedGroups = [];

class ScheduleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      universityName: '',
      username: '',
      password: '',
      confirmPassword: '',
      passwordError: false
    };

    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  handleGroupChange(value) {
    selectedGroups = value;
  }

  render() {
    const { classes, groups } = this.props;
    const { passwordError } = this.state;

    return (
      <Container style={groupSelect}>
        <Select
          theme={theme}
          isMulti
          onChange={this.handleGroupChange}
          options={groups}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    groups: state.infoReducers.groups
  };
};

export default compose(connect(mapStateToProps))(ScheduleTable);
