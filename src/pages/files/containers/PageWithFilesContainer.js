import { connect } from 'react-redux';

import { PageWithFiles } from '../components/PageWithFiles';

const mapStateToProps = state => {
  return {
    userRole: state.userReducers.type,
    files: state.filesReducers.files
  };
};

const PageWithFilesContainer = connect(mapStateToProps)(PageWithFiles);

export default PageWithFilesContainer;
