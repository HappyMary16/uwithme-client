import React from 'react';

import {Button, Col, Container, Row} from 'react-bootstrap';
import i18n from '../../../config/i18n';
import {AddDepartment} from './AddDepartment';
import {AddInstitute} from './AddInstitute';
import {AddGroup} from './AddGroup';

export function CreateStructurePanel() {
  const [openInstituteDialog, setOpenInstituteDialog] = React.useState(false);
  const [openDepartmentDialog, setOpenDepartmentDialog] = React.useState(false);
  const [openGroupDialog, setOpenGroupDialog] = React.useState(false);

  return (
    <Container>
      {openInstituteDialog && <AddInstitute
        handleClose={() => setOpenInstituteDialog(false)}/>}
      {openDepartmentDialog && <AddDepartment
        handleClose={() => setOpenDepartmentDialog(false)}
      />}
      {openGroupDialog && <AddGroup handleClose={() => setOpenGroupDialog(false)}/>}

      <Row sm={12}>
        <Col sm={12} md={4} lg={{offset: 3, span: 3}}>
          <Button
            variant={'purple'}
            onClick={() => setOpenInstituteDialog(true)}
          >
            {i18n.t('create_institute')}
          </Button>
        </Col>
        <Col sm={12} md={4} lg={3}>
          <Button
            variant={'purple'}
            onClick={() => setOpenDepartmentDialog(true)}
          >
            {i18n.t('create_department')}
          </Button>
        </Col>
        <Col sm={12} md={4} lg={3}>
          <Button
            variant={'purple'}
            onClick={() => setOpenGroupDialog(true)}
          >
            {i18n.t('create_group')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
