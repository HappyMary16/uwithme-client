import {Button, Col, Container, Row} from 'react-bootstrap';
import {AddDepartment} from './AddDepartment';
import {AddInstitute} from './AddInstitute';
import {AddGroup} from './AddGroup';
import {useState} from "react";
import {useTranslation} from "react-i18next";

export function CreateStructurePanel() {

  const {t} = useTranslation("department");

  const [openInstituteDialog, setOpenInstituteDialog] = useState(false);
  const [openDepartmentDialog, setOpenDepartmentDialog] = useState(false);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);

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
            {t('create_institute')}
          </Button>
        </Col>
        <Col sm={12} md={4} lg={3}>
          <Button
            variant={'purple'}
            onClick={() => setOpenDepartmentDialog(true)}
          >
            {t('create_department')}
          </Button>
        </Col>
        <Col sm={12} md={4} lg={3}>
          <Button
            variant={'purple'}
            onClick={() => setOpenGroupDialog(true)}
          >
            {t('create_group')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
