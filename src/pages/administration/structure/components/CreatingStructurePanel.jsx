import React from 'react';

import Button from 'react-bootstrap/Button';
import i18n from '../../../../locales/i18n';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AddDepartment } from './AddDepartment';
import { AddInstitute } from './AddInstitute';
import { AddGroup } from './AddGroup';

export const CreateStructurePanel = ({ institutes, departments, createInstitute, createDepartment, createGroup }) => {

  const [openInstituteDialog, setOpenInstituteDialog] = React.useState(false);
  const [openDepartmentDialog, setOpenDepartmentDialog] = React.useState(false);
  const [openGroupDialog, setOpenGroupDialog] = React.useState(false);

  return (
    <Container className={'margin-bottom'}>
      <AddInstitute open={openInstituteDialog}
                    handleClose={() => setOpenInstituteDialog(false)}
                    handleCreate={createInstitute}/>
      <AddDepartment open={openDepartmentDialog}
                     handleClose={() => setOpenDepartmentDialog(false)}
                     institutes={institutes}
                     handleCreate={createDepartment}/>
      <AddGroup open={openGroupDialog}
                handleClose={() => setOpenGroupDialog(false)}
                institutes={institutes}
                departments={departments}
                handleCreate={createGroup}/>
      <Row sm={12} md={9}>
        <Col sm={12} md={{ offset: 3, span: 3 }}>
          <Button
            className={'margin-top'}
            block
            variant={'purple'}
            onClick={() => setOpenInstituteDialog(true)}>
            {i18n.t('create_institute')}
          </Button>
        </Col>
        <Col sm={12} md={3}>
          <Button
            className={'margin-top'}
            block
            variant={'purple'}
            onClick={() => setOpenDepartmentDialog(true)}>
            {i18n.t('create_department')}
          </Button>
        </Col>
        <Col sm={12} md={3}>
          <Button
            className={'margin-top'}
            block
            variant={'purple'}
            onClick={() => setOpenGroupDialog(true)}>
            {i18n.t('create_group')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
