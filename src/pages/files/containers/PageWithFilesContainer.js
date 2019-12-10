import { connect } from 'react-redux';

import { PageWithFiles } from '../components/PageWithFiles';

const mapStateToProps = state => {
  return {
    userType: state.userReducers.type,
    files: state.filesReducers.files
  };
};

const PageWithFilesContainer = connect(mapStateToProps)(PageWithFiles);

export default PageWithFilesContainer;
