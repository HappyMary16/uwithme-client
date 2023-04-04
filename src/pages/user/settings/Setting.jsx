import React, {useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import i18n from '../../../locales/i18n';
import EditSetting from './components/EditSetting';
import {useSelector} from 'react-redux';
import {KeycloakSetting} from './components/KeycloakSetting';
import {ADMIN} from '../../../constants/userRoles';
import {useFetchUserQuery} from "../../../store/auth/authApiSlice";
import {selectActiveRole} from "../../../store/auth/authSlice";
import {useDeleteUserMutation} from "../../../store/user/userApiSlice";

export default function Setting() {

  const [deleteUser] = useDeleteUserMutation();

  const user = useFetchUserQuery().data;
  const activeRole = useSelector(selectActiveRole);

  const [isEditMode, setEditMode] = useState(false);

  return (
    <div>
      <KeycloakSetting user={user}/>
      <hr/>
      <EditSetting isEditMode={isEditMode} setEditMode={setEditMode}/>
      {!isEditMode && (
        <Row className='justify-content-around'>
          <Col
            xs={12}
            md={{offset: activeRole === ADMIN ? 8 : 4, span: 4}}
            lg={{offset: activeRole === ADMIN ? 9 : 6, span: 3}}
          >
            <Button variant={'red'} onClick={() => deleteUser()}>
              {i18n.t('delete')}
            </Button>
          </Col>
          {activeRole !== ADMIN && (
            <Col xs={12} md={4} lg={3}>
              <Button variant={'purple'} onClick={() => setEditMode(true)}>
                {i18n.t('edit')}
              </Button>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
}
