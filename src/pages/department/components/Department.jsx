import React, {Fragment, useState} from 'react';
import {GroupList} from './GroupList';
import {ListGroup} from 'react-bootstrap';
import {ListItem} from '../../common/components/ListItem';
import {DepartmentIcon} from '../../../icons/DepartmentIcon';
import {useDeleteDepartmentMutation} from "../../../store/department/departmentApiSlice";
import {RemoveDepartment} from "./RemoveDepartment";
import {skipToken} from "@reduxjs/toolkit/query";
import {useFetchGroupsByDepartmentQuery} from "../../../store/group/groupApiSlice";

export default function Department({department}) {

  const {data: groups} = useFetchGroupsByDepartmentQuery(department?.value ?? skipToken);

  const [open, setOpen] = useState(false);
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  return (
    <Fragment>
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
    </Fragment>
  );
}
