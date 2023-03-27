import React, {useEffect} from 'react';
import {SubjectFiles} from './components/SubjectFiles';
import {ADD_FILE, SHARE_FILES} from '../../../constants/links';
import i18n from '../../../locales/i18n';
import {TEACHER} from '../../../constants/userRoles';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Col, ListGroup, Row} from 'react-bootstrap';
import {EmptyPage} from '../../common/components/EmptyPage';
import {loadSubjectsAndFiles} from '../../../actions/fileActions';
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";
import {selectActiveRole} from "../../../store/slices/authSlice";

export default function PageWithFiles() {

  const dispatch = useDispatch();

  const userId = useFetchUserQuery().data?.id;

  const subjects = useSelector(state => state.filesReducers.subjects);
  const userRole = useSelector(selectActiveRole);
  const files = useSelector(state => state.filesReducers.files);
  const isFetching = useSelector(state => state.navigationReducers.isFetching);

  useEffect(() => {
    dispatch(loadSubjectsAndFiles(userId));
  }, [userId, dispatch])

  return (
    <Col xs={12}>
      {userRole === TEACHER && (
        <Row className="justify-content-around">
          <Col
            xs={12}
            md={{offset: 4, span: 3}}
            lg={{offset: 5, span: 3}}
            xl={{offset: 7, span: 2}}
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
        <EmptyPage list={subjects} isFetching={isFetching}/>

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
