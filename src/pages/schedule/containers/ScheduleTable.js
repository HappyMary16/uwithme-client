import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TableContainer from '@material-ui/core/TableContainer';
import { Container } from '@material-ui/core';

const useStyles = theme => ({
  table: {
    marginTop: theme.spacing(2)
  },
  cell: {
    borderColor: '#D3D3D3',
    borderWidth: '1px',
    borderLeftStyle: 'solid'
  }
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('8:30-10:05', 159, 6.0, 24, 4.0),
  createData('10:25-12:00', 237, 9.0, 37, 4.3),
  createData('12:35-14:10', 262, 16.0, 24, 6.0),
  createData('14:30-16:05', 305, 3.7, 67, 4.3),
  createData('16:25-18:00', 356, 16.0, 49, 3.9)
];

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
    const { classes } = this.props;

    return (
      <Container className={classes.table}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell> </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Понеділок
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Вівторок
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Середа
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Четвер
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  П'ятниця
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.calories}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.fat}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.carbs}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.protein}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {' '}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
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

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(ScheduleTable);
