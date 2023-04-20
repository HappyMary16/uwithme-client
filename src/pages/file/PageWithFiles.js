import React, {Fragment} from 'react';
import {ADD_FILE, SHARE_FILES} from '../../constants/links';
import i18n from '../../locales/i18n';
import {TEACHER} from '../../constants/userRoles';
import {useSelector} from 'react-redux';
import {Button, Col, ListGroup, Row} from 'react-bootstrap';
import {EmptyPage} from '../common/components/EmptyPage';
import {selectActiveRole} from "../../store/user/authSlice";
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchSubjectsByUserIdQuery} from "../../store/subject/subjectApiSlice";
import {useFetchFilesQuery} from "../../store/file/fileApiSlice";
import {selectApiLoading} from "../../App";
import {SubjectFiles} from "./components/SubjectFiles";

export default function PageWithFiles() {

  const userRole = useSelector(selectActiveRole);

  const {data: subjects} = useFetchSubjectsByUserIdQuery(getId() ?? skipToken);
  const {data: files} = useFetchFilesQuery(getId() ?? skipToken);
  const isFetching = useSelector(selectApiLoading);

  return (
    <Fragment>
      {userRole === TEACHER && (
        <Row className="justify-content-around">
          <Col
            xs={12}
            md={{offset: 4, span: 3}}
            lg={{offset: 5, span: 3}}
            xl={{offset: 7, span: 2}}
          >
            <Button href={ADD_FILE} variant={"purple"}>
              {i18n.t("add_files_page")}
            </Button>
          </Col>
          <Col xs={12} md={5} lg={4} xl={3}>
            <Button href={SHARE_FILES} variant={"purple"}>
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
    </Fragment>
  );
}
