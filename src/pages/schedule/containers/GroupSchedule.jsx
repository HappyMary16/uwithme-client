import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessonsByGroupId } from '../actions';
import { ScheduleTable } from '../components/ScheduleTable';
import { Container } from '@material-ui/core';
import i18n from '../../../locales/i18n';
import Select from 'react-select';
import { marginTop, selectorColors } from '../../../common/styles/styles';
import { loadGroupsByUniversityId } from '../../administration/structure/actions';
import { getGroupById } from '../../../utils/StructureUtils';

class GroupSchedule extends Component {

  constructor(props) {
    super(props);

    this.state = {
      groupId: props.groupId
    };

    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  componentDidMount() {
    const { dispatch, groupId, universityId } = this.props;
    dispatch(loadGroupsByUniversityId(universityId));

    groupId && dispatch(findLessonsByGroupId(groupId));
  }

  handleGroupChange(groupId) {
    const { dispatch } = this.props;
    groupId && this.setState({
      groupId: groupId
    });
    groupId && dispatch(findLessonsByGroupId(groupId));
  }

  render() {
    const { groups, lessons, user } = this.props;
    const { groupId } = this.state;

    return (
      <Container>
        <Container style={marginTop}>
          <Select
            placeholder={i18n.t('select_group')}
            theme={selectorColors}
            // isMulti
            onChange={(e) => this.handleGroupChange(e.value)}
            options={groups}
            defaultValue={getGroupById(groups, groupId)}
          />
        </Container>
        {groupId && lessons && <ScheduleTable lessons={lessons} user={user} isMine={true}/>}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    universityId: state.authReducers.user.universityId,
    groups: state.adminReducers.groups,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(GroupSchedule);
