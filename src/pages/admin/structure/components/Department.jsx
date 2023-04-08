import React, {useState} from 'react';
import {GroupList} from './GroupList';
import {ListGroup} from 'react-bootstrap';
import {ListItem} from '../../../common/components/ListItem';
import {DepartmentIcon} from '../../../icons/DepartmentIcon';
import {useDeleteDepartmentMutation} from "../../../../store/department/departmentApiSlice";
import {RemoveDepartment} from "./RemoveDepartment";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchGroupsQuery} from "../../../../store/group/groupApiSlice";

export default function Department({department}) {

  const {data: groups} = useFetchGroupsQuery(department?.value ?? skipToken);

  const [open, setOpen] = useState(false);
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  return (
    <div>
      {openRemoveDialog && <RemoveDepartment department={department}
                                             handleYes={() => deleteDepartment(department.value)}
                                             handleNo={() => setOpenRemoveDialog(false)}/>}
      <ListGroup.Item
        className={"padding-left"}
        action
        onClick={() => setOpen(!open)}
      >
        <ListItem
          open={open}
          text={department.label}
          icon={<DepartmentIcon/>}
          isDeletePresent
          deleteFunc={() => setOpenRemoveDialog(true)}
        />
      </ListGroup.Item>

      <GroupList open={open} groups={groups ?? []}/>
    </div>
  );
}
