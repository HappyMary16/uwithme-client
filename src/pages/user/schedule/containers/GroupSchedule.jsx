import React, { Component } from 'react';
import { connect } from 'react-redux';
import { findLessonsByGroupId } from '../actions';
import { ScheduleTable } from '../components/ScheduleTable';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import i18n from '../../../../locales/i18n';
import Select from 'react-select';
import { selectorColors } from '../../../../styles/styles';
import { getGroupById } from '../../../../utils/StructureUtils';
import { DeleteLessonDialog } from '../../../admin/deleteLesson/DeleteLessonDialog';
import Button from 'react-bootstrap/Button';
import { deleteLesson } from '../../../admin/deleteLesson/actions';
import { getLessonsByGroup } from '../../../../utils/ScheduleUtil';
import { loadGroupsByUniversityId } from '../../../../actions/groupActions';

class GroupSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupId: props.groupId,
      isEditMode: false,
      deleteDialog: false,
      lessonToDelete: {}
    };

    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.endEditing = this.endEditing.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.openDeleteLessonDialog = this.openDeleteLessonDialog.bind(this);
    this.closeDeleteLessonDialog = this.closeDeleteLessonDialog.bind(this);
    this.deleteLesson = this.deleteLesson.bind(this);
  }

  componentDidMount() {
    const { dispatch, groupId, universityId } = this.props;
    dispatch(loadGroupsByUniversityId(universityId));

    groupId && dispatch(findLessonsByGroupId(groupId));
  }

  handleGroupChange(groupId) {
    const { dispatch } = this.props;
    groupId &&
      this.setState({
        groupId: groupId
      });
    groupId && dispatch(findLessonsByGroupId(groupId));
  }

  endEditing() {
    this.setState({ isEditMode: false });
  }

  startEdit() {
    this.setState({ isEditMode: true });
  }

  openDeleteLessonDialog(lesson) {
    this.setState({
      deleteDialog: true,
      lessonToDelete: lesson
    });
  }

  closeDeleteLessonDialog() {
    this.setState({
      deleteDialog: false
    });
  }

  deleteLesson(groups) {
    const { dispatch } = this.props;
    const { lessonToDelete } = this.state;

    dispatch(deleteLesson(lessonToDelete, groups));
  }

  render() {
    const { groups, lessons, user } = this.props;
    const { groupId, isEditMode, deleteDialog, lessonToDelete } = this.state;

    return (
      <div>
        {isEditMode && deleteDialog && (
          <DeleteLessonDialog
            open={deleteDialog}
            lesson={lessonToDelete}
            handleClose={this.closeDeleteLessonDialog}
            handleDelete={this.deleteLesson}
          />
        )}
        <Row spacing={2}>
          <Col sm={12} md={9}>
            <Select
              placeholder={i18n.t('select_group')}
              theme={selectorColors}
              // isMulti
              onChange={e => this.handleGroupChange(e.value)}
              options={groups}
              defaultValue={getGroupById(groups, groupId)}
              className="selector"
            />
          </Col>
          <Col sm={12} md={3}>
            <Button
              block
              variant={'purple'}
              onClick={
                isEditMode ? () => this.endEditing() : () => this.startEdit()
              }
            >
              {i18n.t(isEditMode ? 'save' : 'edit')}
            </Button>
          </Col>
        </Row>
        {groupId && lessons && (
          <ScheduleTable
            lessons={getLessonsByGroup(lessons, groups, groupId)}
            user={user}
            isMine={true}
            isEditMode={isEditMode}
            deleteLesson={this.openDeleteLessonDialog}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authReducers.user,
    universityId: state.authReducers.user.universityId,
    groups: state.groupReducers.groups,
    lessons: state.scheduleReducers.lessons
  };
};

export default connect(mapStateToProps)(GroupSchedule);
