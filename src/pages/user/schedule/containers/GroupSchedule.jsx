import React, {useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import i18n from '../../../../locales/i18n';
import Select from 'react-select';
import {selectorColors} from '../../../../styles/styles';
import {getGroupById} from '../../../../utils/StructureUtils';
import {DeleteLessonDialog} from '../../../admin/deleteLesson/DeleteLessonDialog';
import {Schedule} from '../components/Schedule';
import {ADD_LESSON} from '../../../../constants/links';
import {useNavigate, useParams} from "react-router-dom";
import {useFetchUserQuery} from "../../../../store/user/userApiSlice";
import {getId} from "../../../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchGroupsQuery} from "../../../../store/group/groupApiSlice";
import {useDeleteLessonsMutation, useFetchLessonsByQueryParamsQuery} from "../../../../store/lesson/lessonApiSlice";

export default function GroupSchedule() {

  const navigate = useNavigate();
  const [deleteLessons] = useDeleteLessonsMutation();

  const [groupId, setGroupId] = useState(useParams().groupId);

  const user = useFetchUserQuery(getId() ?? skipToken).data;
  const {data: groups} = useFetchGroupsQuery(getId() ? null : skipToken);
  const {currentData: lessons} = useFetchLessonsByQueryParamsQuery(groupId ? {groupId} : skipToken);

  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState({});

  function handleGroupChange(groupId) {
    groupId && setGroupId(groupId)
  }

  function openDeleteLessonDialog(lesson) {
    setDeleteDialog(true);
    setLessonToDelete(lesson);
  }

  return (
    <div>
      {isEditMode && deleteDialog && (
        <DeleteLessonDialog
          open={deleteDialog}
          lesson={lessonToDelete}
          handleClose={() => setDeleteDialog(false)}
          handleDelete={(groups) => deleteLessons({lessonId: lessonToDelete?.id, groups})}
        />
      )}
      <Row spacing={2}>
        <Col sm={12} md={6}>
          <Select
            placeholder={i18n.t('select_group')}
            theme={selectorColors}
            // isMulti
            onChange={e => handleGroupChange(e.value)}
            options={groups}
            defaultValue={getGroupById(groups, groupId)}
            className='selector'
          />
        </Col>
        <Col sm={12} md={3}>
          <Button
            block
            variant={'purple'}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {i18n.t(isEditMode ? 'save' : 'edit')}
          </Button>
        </Col>
        <Col sm={12} md={3}>
          <Button
            block
            variant={'purple'}
            onClick={() => navigate(ADD_LESSON)}
          >
            {i18n.t('add_lesson')}
          </Button>
        </Col>
      </Row>
      {groupId && lessons && (
        <Schedule
          lessons={lessons}
          user={user}
          isEditMode={isEditMode}
          deleteLesson={openDeleteLessonDialog}
        />
      )}
    </div>
  );
}