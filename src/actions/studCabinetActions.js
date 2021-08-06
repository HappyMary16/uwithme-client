export const LOAD_SUBJECTS_SCORES = 'LOAD_SUBJECTS_SCORES';
export const RENDER_SUBJECTS_SCORES = 'RENDER_SUBJECTS_SCORES';

export const LOAD_STUDENTS_RATING = 'LOAD_STUDENTS_RATING';
export const RENDER_STUDENTS_RATING = 'RENDER_STUDENTS_RATING';

export const RENDER_STUDENT_INFO = 'RENDER_STUDENT_INFO';

export const loadSubjectsScores = (email, password, semester) => ({
  type: LOAD_SUBJECTS_SCORES,
  payload: {
    email,
    password,
    semester
  }
});

export const renderSubjectsScores = (semester, subjectsScores) => ({
  type: RENDER_SUBJECTS_SCORES,
  payload: {
    semester,
    subjectsScores
  }
});

export const loadStudentsRating = (email, password, semester) => ({
  type: LOAD_STUDENTS_RATING,
  payload: {
    email,
    password,
    semester
  }
});

export const renderStudentsRating = (semester, studentsScores) => ({
  type: RENDER_STUDENTS_RATING,
  payload: {
    semester,
    studentsScores
  }
});

export const renderStudentInfo = (studentInfo, email, password) => {
  let semester = studentInfo.course * 2;
  if (new Date().getMonth() < 12) {
    semester--;
  }
  if (new Date().getMonth() < 10) {
    semester--;
  }

  return {
    type: RENDER_STUDENT_INFO,
    payload: {
      ...studentInfo,
      email,
      password,
      semester
    }
  };
};
