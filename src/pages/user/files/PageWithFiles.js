import React from 'react';
import { SubjectFiles } from './components/SubjectFiles';
import { ADD_FILE, SHARE_FILES } from '../../../constants/links';
import i18n from '../../../locales/i18n';
import { TEACHER } from '../../../constants/userRoles';
import { connect } from 'react-redux';
import { Button, Col, ListGroup, Row } from 'react-bootstrap';
import { EmptyPage } from '../../common/components/EmptyPage';
import { loadSubjectsAndFiles } from '../../../actions/fileActions';

class PageWithFiles extends React.Component {
  componentDidMount() {
    const { dispatch, userId } = this.props;
    dispatch(loadSubjectsAndFiles(userId));
  }

  render() {
    const { userRole, subjects, files, isFetching } = this.props;

    return (
      <Col xs={12}>
        {userRole === TEACHER && (
          <Row className="justify-content-around">
            <Col
              xs={12}
              md={{ offset: 4, span: 3 }}
              lg={{ offset: 5, span: 3 }}
              xl={{ offset: 7, span: 2 }}
            >
              <Button href={ADD_FILE} variant={"purple"} block>
                {i18n.t("add_files_page")}
              </Button>
            </Col>
            <Col xs={12} md={5} lg={4} xl={3}>
              <Button href={SHARE_FILES} variant={"purple"} block>
                {i18n.t("share_files_page")}
              </Button>
            </Col>
          </Row>
        )}
        <ListGroup variant={"flush"}>
          <EmptyPage list={subjects} isFetching={isFetching} />

          {Array.isArray(subjects) &&
            subjects.map((subject, i) => (
              <SubjectFiles
                key={i}
                name={subject.name}
                files={
                  files && files.filter(file => file.subjectId === subject.id)
                }
              />
            ))}
        </ListGroup>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.authReducers.user.id,
    userRole: state.authReducers.user.activeRole,
    subjects: state.filesReducers.subjects,
    files: state.filesReducers.files,
    username: state.authReducers.user.username,
    isFetching: state.navigationReducers.isFetching
  };
};

export default connect(mapStateToProps)(PageWithFiles);
