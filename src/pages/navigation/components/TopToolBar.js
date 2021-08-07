import React from 'react';
import i18n from '../../../locales/i18n';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import '../../../styles/navigation.css';
import { ThreeBarsIcon } from '@primer/octicons-react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export const TopToolBar = ({
  user,
  isAuthenticated,
  signOutFunc,
  openMenu
}) => {
  return (
    <Nav className={'app-bar'}>
      {user && (
        <Col xs={2} sm={1}>
          <div onClick={openMenu()}>
            <ThreeBarsIcon size={35} className={'menu-icon icon'} />
          </div>
        </Col>
      )}
      {user && (
        <Col xs={5} sm={8} md={9} xl={10}>
          <Row className="justify-content-center">
            <img
              src="/UniversityWithMeLongLogo.png"
              alt=""
              title="institute"
              className={'app-icon'}
            />
          </Row>
        </Col>
      )}
      {!user && (
        <Col xs={7} sm={9} md={10} xl={11}>
          <img
            src="/UniversityWithMeLongLogo.png"
            alt=""
            title="institute"
            className={'app-icon'}
          />
        </Col>
      )}
      <Col xs={5} sm={3} md={2} xl={1}>
        {isAuthenticated && (
          <Button
            variant={'purple'}
            className={'menu-btn'}
            onClick={signOutFunc()}
            block
          >
            {i18n.t('sign_out')}
          </Button>
        )}
      </Col>
    </Nav>
  );
};
