import {Fragment, useState} from 'react';
import DepartmentsList from './DepartmentsList';
import {ListGroup} from 'react-bootstrap';
import {ListItem} from '../../common/components/ListItem';
import {InstituteIcon} from '../../../icons/InstituteIcon';
import {useDeleteDepartmentMutation, useFetchSubDepartmentsQuery} from "../../../store/department/departmentApiSlice";
import {RemoveDepartment} from "./RemoveDepartment";
import {skipToken} from "@reduxjs/toolkit/query";

export default function Institute({institute}) {

  const [open, setOpen] = useState(false);
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const {data: departments} = useFetchSubDepartmentsQuery(institute?.value ?? skipToken);

  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);

  return (
    <Fragment>
      {openRemoveDialog && <RemoveDepartment department={institute}
                                             handleYes={() => deleteDepartment(institute.value)}
                                             handleNo={() => setOpenRemoveDialog(false)}/>}
      <ListGroup.Item action onClick={() => setOpen(!open)}>
        <ListItem
          open={open}
          text={institute.label}
          icon={<InstituteIcon className={'icon'}/>}
          isDeletePresent
          deleteFunc={() => setOpenRemoveDialog(true)}
        />
      </ListGroup.Item>

      <DepartmentsList
        open={open}
        departments={departments ?? []}
      />
    </Fragment>
  );
}
