import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessons } from '../../../../actions/scheduleActions';
import { Schedule } from '../components/Schedule';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i18n from '../../../../locales/i18n';
import Button from 'react-bootstrap/Button';
import { history } from '../../../../store/Store';
import { ADD_LESSON } from '../../../../constants/links';
import { isTeacher } from '../../../../utils/UsersUtil';

class MySchedule extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(findLessons());
  }

  render() {
    const { lessons, user } = this.props;

    return (
      <div>
        {isTeacher(user) && <Row spacing={2}>
          <Col sm={12} md={{ offset: 9, span: 3 }}>
            <Button
              block
              variant={'purple'}
              onClick={() => history.push(ADD_LESSON)}
            >
              {i18n.t('add_lesson')}
            </Button>
          </Col>
        </Row>}
        <Schedule lessons={lessons} user={user} isMine />;
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(MySchedule);
