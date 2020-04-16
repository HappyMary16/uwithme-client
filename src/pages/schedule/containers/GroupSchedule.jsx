import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessonsByGroupId } from '../actions';
import { ScheduleTable } from '../components/ScheduleTable';
import { Container } from '@material-ui/core';
import i18n from '../../../locales/i18n';
import Select from 'react-select';
import { marginTop, selectorColors } from '../../../common/styles/styles';
import { loadGroupsByUniversityId } from '../../administration/structure/actions';

class GroupSchedule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: ''
    };

    this.handleGroupChange = this.handleGroupChange.bind(this);
  }
  componentDidMount() {
    const { dispatch, universityId } = this.props;
    dispatch(loadGroupsByUniversityId(universityId));
  }

  handleGroupChange(groupId) {
    const { dispatch } = this.props;
    groupId && dispatch(findLessonsByGroupId(groupId.value));
  }

  render() {
    const { groups, lessons } = this.props;

    return (
      <Container>
        <Container style={marginTop}>
          <Select
            placeholder={i18n.t('select_group')}
            theme={selectorColors}
            // isMulti
            onChange={this.handleGroupChange}
            options={groups}
          />
        </Container>
        {lessons && <ScheduleTable lessons={lessons}/>}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    universityId: state.authReducers.user.universityId,
    groups: state.adminReducers.groups,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(GroupSchedule);
