export const LOAD_STUDENTS_RATING = 'LOAD_STUDENTS_RATING';
export const RENDER_STUDENTS_RATING = 'RENDER_STUDENTS_RATING';

export const RENDER_STUDENT_INFO = 'RENDER_STUDENT_INFO';

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

export const renderStudentInfo = (email, password, semester) => ({
  type: RENDER_STUDENT_INFO,
  payload: {
    email,
    password,
    semester
  }
});
