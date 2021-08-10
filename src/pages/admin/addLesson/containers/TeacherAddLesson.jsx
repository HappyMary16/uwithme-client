import React, { Component } from "react";
import { connect } from "react-redux";
import { loadGroupsByUniversityId } from "../../../../actions/groupActions";
import {
  loadBuildings,
  loadLectureHalls
} from "../../../../actions/lectureHallActions";
import AddLesson from "../components/AddLesson";
import { getTeachers } from "../../../../utils/UsersUtil";
import { addLessonToSchedule } from "../../../../actions/scheduleActions";
import { loadSubjects } from "../../../../actions/fileActions";

class TeacherAddLesson extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { dispatch, universityId } = this.props;
    if (universityId) {
      dispatch(loadGroupsByUniversityId(universityId));
      dispatch(loadSubjects());
      dispatch(loadBuildings());
      dispatch(loadLectureHalls());

      //TODO
      // load lessons time (feature)
    }
  }

  submit(lessonData) {
    const { dispatch } = this.props;
    const {
      subject,
      lectureHall,
      selectedGroups,
      weekDays,
      lessonTimes,
      weekNumbers
    } = lessonData;

    dispatch(
      addLessonToSchedule(
        subject.value,
        subject.label,
        undefined,
        undefined,
        lectureHall.value,
        selectedGroups,
        weekDays,
        lessonTimes,
        weekNumbers
      )
    );
  }

  render() {
    const { teachers, lectureHalls, buildings, groups, subjects } = this.props;

    return (
      <AddLesson
        teachers={teachers}
        lectureHalls={lectureHalls}
        buildings={buildings}
        groups={groups}
        subjects={subjects}
        submit={this.submit}
        isTeacher={true}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.groupReducers.groups,
    universityId: state.authReducers.user.universityId,
    teachers: getTeachers(state.userReducers.users),
    subjects: state.filesReducers.subjects,
    lectureHalls: state.lectureHallReducers.lectureHalls,
    buildings: state.lectureHallReducers.buildings
  };
};

export default connect(mapStateToProps)(TeacherAddLesson);
