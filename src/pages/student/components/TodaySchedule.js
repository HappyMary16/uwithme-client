import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles2 = makeStyles({
  root: {
    width: '100%'
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: 'auto'
  }
});

export const TodaySchedule = ({ schedules }) => {
  const classes = useStyles2();

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {schedules.map(schedule => (
              <TableRow key={schedule.name}>
                <TableCell align={'left'} component="th" scope="row">
                  {schedule.time}
                </TableCell>
                <TableCell>{schedule.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
};
