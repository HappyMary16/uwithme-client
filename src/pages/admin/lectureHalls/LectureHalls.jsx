import React, { Component } from 'react';
import { connect } from 'react-redux';
import i18n from '../../../locales/i18n';
import { AddLectureHall } from './components/AddLectureHall';
import { createLectureHall, loadBuildings, loadLectureHalls } from './actions';
import { BuildingsList } from './components/BuildingsList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

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

    dispatch(
      createLectureHall(
        universityId,
        buildingName,
        lectureHallName,
        placeNumber
      )
    );
    if (buildingName === buildingId) {
      dispatch(loadBuildings());
    }
  }

  render() {
    const { buildings, lectureHalls } = this.props;
    const { openCreateDialog } = this.state;

    return (
      <Container>
        <Row>
          <Col sm={12} md={{ offset: 8, span: 4 }} lg={{ offset: 9, span: 3 }}>
            <Button
              block
              variant={'purple'}
              onClick={() => this.setState({ openCreateDialog: true })}
            >
              {i18n.t('create_lecture_hall')}
            </Button>
            <AddLectureHall
              open={openCreateDialog}
              handleClose={() => this.setState({ openCreateDialog: false })}
              buildings={buildings}
              handleCreate={this.createLectureHall}
            />
          </Col>
        </Row>

        <BuildingsList buildings={buildings} lectureHalls={lectureHalls} />
      </Container>
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

export default connect(mapStateToProps)(LectureHalls);
