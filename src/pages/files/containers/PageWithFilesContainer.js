import { connect } from 'react-redux';

import { PageWithFiles } from '../components/PageWithFiles';
import { loadSubjects } from '../upload/actions';

const mapStateToProps = state => {
  return {
    userRole: state.authReducers.user.role,
    subjects: state.filesReducers.subjects,
    files: state.filesReducers.files,
    username: state.authReducers.user.username
  };
};

let PageWithFilesContainer = ({ dispatch }) => {
  dispatch(loadSubjects(mapStateToProps.username));
};

PageWithFilesContainer = connect(mapStateToProps)(PageWithFiles);

export default PageWithFilesContainer;
