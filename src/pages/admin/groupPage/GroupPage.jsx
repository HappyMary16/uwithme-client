import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {findAllStudentsWithoutGroup, findUsersByGroupId} from '../../../utils/UsersUtil';
import {GroupCard} from './components/GroupCard';
import {StudentsList} from './components/StudentList';
import AddStudentToGroup from './components/AddStudentToGroup';
import {RemoveStudentFromGroup} from './components/RemoveStudentFromGroup';
import {Container} from 'react-bootstrap';
import {loadGroupById} from '../../../actions/groupActions';
import {
  addStudentToGroup,
  loadStudentsByGroupId,
  loadStudentsWithoutGroup,
  removeStudentFromGroup
} from '../../../actions/userActions';
import {AddGroup} from "../structure/components/AddGroup";
import {useParams} from "react-router-dom";
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";
import {useFetchDepartmentQuery} from "../../../store/slices/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";

export default function GroupPage() {

  const dispatch = useDispatch();

  const {groupId} = useParams();


  const users = useSelector(state => Object.values(state.userReducers.users));
  const group = useSelector(state => state.groupReducers.groups[groupId]);
  const {data: department} = useFetchDepartmentQuery(group?.departmentId ?? skipToken);
  const {data: institute} = useFetchDepartmentQuery(department?.instituteId ?? skipToken);
  const universityId = useFetchUserQuery().data?.universityId;

  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [openedRemoveStudentDialog, setOpenedRemoveStudentDialog] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState();
  const [openGroupDialog, setOpenGroupDialog] = useState(false);

  useEffect(() => {
    if (groupId) {
      dispatch(loadGroupById(groupId));
      dispatch(loadStudentsByGroupId(groupId));
    }
  }, [groupId, dispatch])

  function openRemoveStudentDialog(student) {
    setOpenedRemoveStudentDialog(true);
    setStudentToRemove(student);
  }

  function removeStudent(studentId) {
    dispatch(removeStudentFromGroup(studentId));
  }

  function loadStudentsAndOpenAddDialog() {
    if (universityId) {
      dispatch(loadStudentsWithoutGroup());
    }
    setOpenAddStudentDialog(true);
  }

  return (
    <div>
      <Container>
        {group && (
          <GroupCard
            group={group}
            department={department}
            institute={institute}
            groupTeacher={users[group.teacherId]}
            openGroupDialog={() => setOpenGroupDialog(true)}
          />
        )}

        {openGroupDialog && <AddGroup
          handleClose={() => setOpenGroupDialog(false)}
          group={group}
        />}

        <StudentsList
          students={findUsersByGroupId(users, groupId)}
          addStudent={loadStudentsAndOpenAddDialog}
          removeStudent={openRemoveStudentDialog}
        />
      </Container>
      <AddStudentToGroup
        open={openAddStudentDialog}
        students={findAllStudentsWithoutGroup(users)}
        handleClose={() => setOpenAddStudentDialog(false)}
        handleAdd={(studentIds) => dispatch(addStudentToGroup(studentIds, groupId))}
      />
      <RemoveStudentFromGroup
        open={openedRemoveStudentDialog}
        student={studentToRemove}
        handleNo={() => {
          setOpenedRemoveStudentDialog(false);
          setStudentToRemove(undefined);
        }}
        handleYes={removeStudent}
      />
    </div>
  );
}