import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import i18n from '../../../locales/i18n';
import {getLectures, getTasks} from '../../../utils/FileUtil';
import Select from 'react-select';
import {selectorColors} from '../../../styles/styles';
import {Button, Col} from 'react-bootstrap';
import {SubjectFiles} from './components/SubjectFiles';
import {EmptyPage} from '../../common/components/EmptyPage';
import {ADD_FILE, FILES_PAGE} from '../../../constants/links';
import {addAccessToFiles, loadSubjectsAndFiles} from '../../../actions/fileActions';
import {useNavigate} from "react-router-dom";
import {getId} from "../../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchGroupsQuery} from "../../../store/group/groupApiSlice";

let selectedGroups = [];
let files = [];

export default function ShareFiles() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subjects = useSelector(state => state.filesReducers.subjects);
  const lectures = useSelector(state => getLectures(state.filesReducers.files));
  const tasks = useSelector(state => getTasks(state.filesReducers.files));
  const {data: groups} = useFetchGroupsQuery();
  const isFetching = useSelector(state => state.navigationReducers.isFetching);

  const [subjectId, setSubjectId] = useState();

  useEffect(() => {
    dispatch(loadSubjectsAndFiles(getId() ?? skipToken));
  }, [dispatch]);

  function submit() {
    dispatch(
      addAccessToFiles(
        files,
        selectedGroups.map(group => group.value)
      )
    );
    files = [];
    selectedGroups = [];
    navigate(FILES_PAGE);
  }

  function handleChange(value, file) {
    if (files.includes(file)) {
      files.filter(f => f !== file);
    } else {
      files.push(file);
    }
  }

  function handleGroupChange(value) {
    selectedGroups = value;
  }

  return (
    <div>
      <EmptyPage
        message={i18n.t("you_do_not_have_any_file")}
        href={ADD_FILE}
        linkText={"add_files_page"}
        list={subjects}
        isFetching={isFetching}
      />

      {subjects && subjects.length > 0 && (
        <div>
          <Select
            className={"selector"}
            theme={selectorColors}
            onChange={opinion => setSubjectId(opinion.value)}
            options={subjects.map(s => {
              return {
                value: s.id,
                label: s.name
              };
            })}
            placeholder={i18n.t("subject")}
          />
          <SubjectFiles
            lectures={lectures}
            tasks={tasks}
            subjectId={subjectId}
            handleChoose={handleChange}
          />
          <Select
            className={"selector"}
            placeholder={i18n.t("groups")}
            theme={selectorColors}
            isMulti
            onChange={handleGroupChange}
            options={groups}
          />

          <Col
            xs={12}
            md={{offset: 9, span: 3}}
            lg={{offset: 9, span: 3}}
            xl={{offset: 10, span: 2}}
          >
            <Button
              block
              type={"submit"}
              variant={"purple"}
              onClick={submit}
            >
              {i18n.t("upload")}
            </Button>
          </Col>
        </div>
      )}
    </div>
  );
}
