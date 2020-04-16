import React from 'react';

import Button from '@material-ui/core/Button';
import i18n from '../../../../../locales/i18n';
import Grid from '@material-ui/core/Grid';
import { AddDepartment } from './AddDepartment';
import { AddInstitute } from './AddInstitute';
import { marginLeft, marginTop } from '../../../../../common/styles/styles';
import { AddGroup } from './AddGroup';

export const CreateStructurePanel = ({ institutes, departments, createInstitute, createDepartment, createGroup }) => {

  const [openInstituteDialog, setOpenInstituteDialog] = React.useState(false);
  const [openDepartmentDialog, setOpenDepartmentDialog] = React.useState(false);
  const [openGroupDialog, setOpenGroupDialog] = React.useState(false);

  return (
    <Grid container xs={12} style={marginTop} spacing={1} justify="flex-end">
      <Button
        style={marginLeft}
        color="primary"
        variant="outlined"
        onClick={() => setOpenInstituteDialog(true)}>
        {i18n.t('create_institute')}
      </Button>
      <AddInstitute open={openInstituteDialog}
                    handleClose={() => setOpenInstituteDialog(false)}
                    handleCreate={createInstitute}/>

      <Button
        style={marginLeft}
        color="primary"
        variant="outlined"
        onClick={() => setOpenDepartmentDialog(true)}>
        {i18n.t('create_department')}
      </Button>
      <AddDepartment open={openDepartmentDialog}
                     handleClose={() => setOpenDepartmentDialog(false)}
                     institutes={institutes}
                     handleCreate={createDepartment}/>

      <Button
        style={marginLeft}
        color="primary"
        variant="outlined"
        onClick={() => setOpenGroupDialog(true)}>
        {i18n.t('create_group')}
      </Button>
      <AddGroup open={openGroupDialog}
                handleClose={() => setOpenGroupDialog(false)}
                institutes={institutes}
                departments={departments}
                handleCreate={createGroup}/>
    </Grid>
  );
};
