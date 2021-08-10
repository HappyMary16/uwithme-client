import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_LESSONS_BY_GROUP_ID,
  LESSONS,
  LESSONS_BY_USERNAME
} from "../constants/serverApi";
import {
  ADD_LESSON_TO_SCHEDULE,
  DELETE_LESSON,
  FIND_LESSONS_BY_GROUP_ID,
  FIND_LESSONS_BY_USER_NAME,
  FIND_LESSONS_FOR_USER,
  renderLesson,
  renderLessons,
  renderLessonsForUser
} from "../actions/scheduleActions";
import { processHttpCall } from "./rootSaga";
import { setMessage } from "../actions/messageAction";

export function* scheduleWatcher() {
  yield takeEvery(FIND_LESSONS_BY_GROUP_ID, findLessonsByGroupId);
  yield takeEvery(FIND_LESSONS_BY_USER_NAME, findLessons);
  yield takeEvery(FIND_LESSONS_FOR_USER, findLessonsByUsername);

  yield takeEvery(ADD_LESSON_TO_SCHEDULE, addLessonToSchedule);
  yield takeEvery(DELETE_LESSON, deleteLesson);
}

function* findLessonsByGroupId(action) {
  const { groupId } = action.payload;

  const response = yield call(processHttpCall, {
    url: GET_LESSONS_BY_GROUP_ID + groupId,
    method: "get"
  });

  if (response) {
    yield put(renderLessons(response));
  }
}

function* findLessons() {
  const response = yield call(processHttpCall, {
    url: LESSONS,
    method: "get"
  });

  if (response) {
    yield put(renderLessons(response));
  }
}

function* findLessonsByUsername(action) {
  const { id } = action.payload;

  const response = yield call(processHttpCall, {
    url: LESSONS_BY_USERNAME + id,
    method: "get"
  });

  if (response) {
    yield put(renderLessonsForUser(response));
  }
}

function* addLessonToSchedule(action) {
  const {
    subjectId,
    subjectName,
    teacherId,
    teacherName,
    lectureHall,
    groups,
    weekDays,
    lessonTimes,
    weekNumbers
  } = action.payload;

  let data = {
    subjectId: subjectId === subjectName ? undefined : subjectId,
    subjectName: subjectName,
    teacherId: teacherId === teacherName ? undefined : teacherId,
    teacherName: teacherName,
    lectureHall,
    groups: groups.map(group => group.value),
    weekDays: weekDays.map(weekDay => weekDay.value),
    lessonTimes: lessonTimes.map(lessonTime => lessonTime.value),
    weekNumbers: weekNumbers.map(weekNumber => weekNumber.value)
  };

  const response = yield call(processHttpCall, {
    url: LESSONS,
    method: "post",
    data
  });

  if (response) {
    yield put(setMessage("Пари додані в розклад"));
  }
}

function* deleteLesson(action) {
  const { lesson, groups } = action.payload;
  let data = {
    lessonId: lesson.id
  };

  if (groups.length === 0) {
    return;
  }
  if (groups.length !== lesson.groups.length) {
    data.groups = groups;
  }

  const response = yield call(processHttpCall, {
    url: LESSONS,
    method: "delete",
    data
  });

  if (response) {
    yield put(renderLesson(lesson.id, response));
  }
}
