import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {findAllStudentsWithoutGroup, findUserById, findUsersByGroupId} from '../../../utils/UsersUtil';
import {GroupCard} from './components/GroupCard';
import {StudentsList} from './components/StudentList';
import AddStudentToGroup from './components/AddStudentToGroup';
import {RemoveStudentFromGroup} from './components/RemoveStudentFromGroup';
import {Container} from 'react-bootstrap';
import {createGroup, loadGroupById} from '../../../actions/groupActions';
import {
  addStudentToGroup,
  loadStudentsByGroupId,
  loadStudentsWithoutGroup,
  removeStudentFromGroup
} from '../../../actions/userActions';
import {AddGroup} from "../structure/components/AddGroup";
import {useParams} from "react-router-dom";
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";

export default function GroupPage() {

  const dispatch = useDispatch();

  const { groupId } = useParams();

  const group = useSelector(state => state.groupReducers.groups[groupId])
  const department = useSelector(state => state.departmentReducers.departments[group.departmentId])
  const users = useSelector(state => Object.values(state.userReducers.users))
  const institute = useSelector(state => state.instituteReducers.institutes[department.instituteId])
  const universityId = useFetchUserQuery().data.universityId;
  const departments = useSelector(state =>  state.departmentReducers.departments)
  const institutes = useSelector(state => state.instituteReducers.institutes)

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
              groupTeacher={findUserById(users, group.teacherId)}
              openGroupDialog={() => setOpenGroupDialog(true)}
            />
          )}

          {openGroupDialog && <AddGroup
            handleClose={() => setOpenGroupDialog(false)}
            institutes={institutes}
            departments={departments}
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