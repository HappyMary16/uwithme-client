import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { compose } from 'redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { marginLeft, marginTop } from '../../../../common/styles/styles';
import i18n from '../../../../locales/i18n';
import { AddLectureHall } from '../components/AddLectureHall';
import { createLectureHall, loadBuildings, loadLectureHalls } from '../action';
import { BuildingsList } from '../components/BuildingsList';

const useStyles = theme => ({
  list: {
    width: '100%'
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
});

class LectureHalls extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCreateDialog: false
    };
    this.createLectureHall = this.createLectureHall.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadBuildings());
      dispatch(loadLectureHalls());
    }
  }

  createLectureHall(buildingName, buildingId, lectureHallName, placeNumber) {
    const { dispatch, universityId } = this.props;

    dispatch(createLectureHall(universityId, buildingName, lectureHallName, placeNumber));
    if (buildingName === buildingId) {
      dispatch(loadBuildings());
    }
  }

  render() {
    const { buildings, lectureHalls, classes } = this.props;
    const { openCreateDialog } = this.state;

    return (
      <Grid container xs={12} className={classes.root}>
        <Grid container style={marginTop} justify='flex-end'>
          <Button
            style={marginLeft}
            color='primary'
            variant='outlined'
            onClick={() => this.setState({ openCreateDialog: true })}>
            {i18n.t('create_lecture_hall')}
          </Button>
          <AddLectureHall open={openCreateDialog}
                          handleClose={() => this.setState({ openCreateDialog: false })}
                          buildings={buildings}
                          handleCreate={this.createLectureHall}/>
        </Grid>

        <BuildingsList buildings={buildings} lectureHalls={lectureHalls} classes={classes}/>

      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    lectureHalls: state.lectureHallReducer.lectureHalls,
    buildings: state.lectureHallReducer.buildings,
    universityId: state.authReducers.user.universityId
  };
};

export default compose(
  withStyles(useStyles),
  connect(mapStateToProps)
)(LectureHalls);