import React, {useState} from 'react';
import {Button, Col, Row} from 'react-bootstrap';
import i18n from '../../../locales/i18n';
import {loadUniversities} from '../../../actions/universityActions';
import {deleteUser} from '../../../actions/userActions';
import EditSetting from './components/EditSetting';
import {useDispatch} from 'react-redux';
import {loadUserUniversityInfo} from '../../../actions/structureActions';
import {KeycloakSetting} from './components/KeycloakSetting';
import {isAdmin} from '../../../utils/UsersUtil';
import {ADMIN, STUDENT, TEACHER} from '../../../constants/userRoles';
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";

export default function Setting() {

  const dispatch = useDispatch();

  const user = useFetchUserQuery().data;

  const [isEditMode, setEditMode] = useState(false);

  function startEdit(isEditMode) {
    const {roles} = user ?? {};

    if (!roles.includes(ADMIN) && isEditMode) {
      const {
        userUniversity,
        userInstitute,
        userDepartment,
        dispatch
      } = this.props;

      dispatch(loadUniversities());

      if (roles && roles.includes(TEACHER)) {
        dispatch(
          loadUserUniversityInfo(userUniversity.value, userInstitute.value)
        );
      }

      if (roles && roles.includes(STUDENT)) {
        dispatch(
          loadUserUniversityInfo(
            userUniversity.value,
            userInstitute.value,
            userDepartment.value
          )
        );
      }
    }

    setEditMode(isEditMode);
  }

  return (
    <div>
      <KeycloakSetting user={user}/>
      <hr/>
      <EditSetting isEditMode={isEditMode} setEditMode={setEditMode}/>
      {!isEditMode && (
        <Row className='justify-content-around'>
          <Col
            xs={12}
            md={{offset: isAdmin(user) ? 8 : 4, span: 4}}
            lg={{offset: isAdmin(user) ? 9 : 6, span: 3}}
          >
            <Button block variant={'red'} onClick={() => dispatch(deleteUser())}>
              {i18n.t('delete')}
            </Button>
          </Col>
          {!isAdmin(user) && (
            <Col xs={12} md={4} lg={3}>
              <Button
                block
                variant={'purple'}
                onClick={() => startEdit(true)}
              >
                {i18n.t('edit')}
              </Button>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
}
