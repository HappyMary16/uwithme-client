import { call, put, takeEvery } from 'redux-saga/effects';
import {
  ADD_STUDENT_TO_GROUP,
  LOAD_GROUP_BY_ID,
  LOAD_STUDENTS_BY_GROUP_ID,
  LOAD_STUDENTS_WITHOUT_GROUP,
  REMOVE_STUDENT_FROM_GROUP
} from './actions';
import { addError, endFetching, startFetching } from '../../navigation/actions';
import http from '../../../services/http';
import {
  GROUP_STUDENT_ID,
  GROUPS,
  STUDENT_GROUP,
  STUDENTS_BY_GROUP_ID,
  STUDENTS_WITHOUT_GROUP
} from '../../../constants/serverApi';
import { renderUser, renderUsers } from '../../user/actions';
import { renderGroup } from '../structure/actions';

export function* groupsWatcher() {
  yield takeEvery(LOAD_STUDENTS_BY_GROUP_ID, action =>
    getStudentsByGroupId(action)
  );
  yield takeEvery(REMOVE_STUDENT_FROM_GROUP, action =>
    removeStudentFromGroup(action)
  );
  yield takeEvery(
    LOAD_STUDENTS_WITHOUT_GROUP,
    getStudentsWithoutGroupByUniversityId
  );
  yield takeEvery(ADD_STUDENT_TO_GROUP, action => addStudentToGroup(action));
  yield takeEvery(LOAD_GROUP_BY_ID, action => loadGroupById(action));
}

function* getStudentsByGroupId(action) {
  try {
    yield put(startFetching());
    const { groupId } = action.payload;

    if (groupId) {
      const users = yield call(http, {
        url: STUDENTS_BY_GROUP_ID + groupId,
        method: 'get'
      });

      if (users) {
        yield put(renderUsers(users.data));
      }
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* removeStudentFromGroup(action) {
  try {
    yield put(startFetching());
    const { studentId } = action.payload;

    const user = yield call(http, {
      url: GROUP_STUDENT_ID + studentId,
      method: 'delete'
    });

    if (user) {
      yield put(renderUser(user.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* getStudentsWithoutGroupByUniversityId() {
  try {
    yield put(startFetching());

    const users = yield call(http, {
      url: STUDENTS_WITHOUT_GROUP,
      method: 'get'
    });

    if (users) {
      yield put(renderUsers(users.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* addStudentToGroup(action) {
  try {
    yield put(startFetching());
    const { studentIds, groupId } = action.payload;

    if (studentIds && groupId) {
      const users = yield call(http, {
        url: STUDENT_GROUP,
        method: 'put',
        data: {
          studentsIds: studentIds,
          groupId: groupId
        }
      });

      if (users) {
        yield put(renderUsers(users.data));
      }
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}

function* loadGroupById(action) {
  try {
    yield put(startFetching());
    const { id } = action.payload;

    const group = yield call(http, {
      url: GROUPS + id,
      method: 'get'
    });

    if (group) {
      yield put(renderGroup(group.data));
    }
  } catch (e) {
    yield put(addError(e));
  } finally {
    yield put(endFetching());
  }
}
