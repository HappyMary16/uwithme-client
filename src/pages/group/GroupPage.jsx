import {useState} from 'react';
import {GroupCard} from './components/GroupCard';
import {StudentsList} from './components/StudentList';
import AddStudentToGroup from './components/AddStudentToGroup';
import {RemoveStudentFromGroup} from './components/RemoveStudentFromGroup';
import {Container} from 'react-bootstrap';
import {AddGroup} from "../department/components/AddGroup";
import {useParams} from "react-router-dom";
import {useFetchUserQuery, useFetchUsersQuery, useUpdateUserMutation} from "../../store/user/userApiSlice";
import {useFetchDepartmentQuery} from "../../store/department/departmentApiSlice";
import {skipToken} from "@reduxjs/toolkit/query";
import {getId} from "../../services/authService";
import {useFetchGroupByIdQuery} from "../../store/group/groupApiSlice";

export default function GroupPage() {

  const [updateUser] = useUpdateUserMutation();

  const {groupId} = useParams();
  const universityId = useFetchUserQuery(getId() ?? skipToken).data?.universityId;

  const {data: users} = useFetchUsersQuery(universityId ? {groupId} : skipToken);
  const {data: group} = useFetchGroupByIdQuery(groupId ?? skipToken);
  const {data: teacher} = useFetchUserQuery(group?.teacherId ?? skipToken);
  const {data: department} = useFetchDepartmentQuery(group?.departmentId ?? skipToken);
  const {data: institute} = useFetchDepartmentQuery(department?.instituteId ?? skipToken);

  const [openAddStudentDialog, setOpenAddStudentDialog] = useState(false);
  const [openedRemoveStudentDialog, setOpenedRemoveStudentDialog] = useState(false);
  const [studentToRemove, setStudentToRemove] = useState();
  const [openGroupDialog, setOpenGroupDialog] = useState(false);

  function openRemoveStudentDialog(student) {
    setOpenedRemoveStudentDialog(true);
    setStudentToRemove(student);
  }

  function removeStudent() {
    updateUser({
      userId: studentToRemove.id,
      universityId: studentToRemove.universityId,
      departmentId: studentToRemove.department.id,
      groupId: null
    });
  }

  function addStudent(studentIds) {
    studentIds.forEach(userId => {
      updateUser({userId, groupId, departmentId: group.departmentId, universityId: group.universityId});
    })
  }

  function loadStudentsAndOpenAddDialog() {
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
            groupTeacher={teacher}
            openGroupDialog={() => setOpenGroupDialog(true)}
          />
        )}

        {openGroupDialog && <AddGroup
          handleClose={() => setOpenGroupDialog(false)}
          group={group}
        />}

        <StudentsList
          students={users}
          addStudent={loadStudentsAndOpenAddDialog}
          removeStudent={openRemoveStudentDialog}
        />
      </Container>
      <AddStudentToGroup
        open={openAddStudentDialog}
        handleClose={() => setOpenAddStudentDialog(false)}
        handleAdd={(studentIds) => addStudent(studentIds)}
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