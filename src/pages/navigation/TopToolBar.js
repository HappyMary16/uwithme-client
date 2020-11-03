import React from 'react';
import i18n from '../../locales/i18n';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './navigation.css';
import { MortarBoardIcon, ThreeBarsIcon } from '@primer/octicons-react';
import Col from 'react-bootstrap/Col';

export const TopToolBar = ({
  user,
  isAuthenticated,
  signOutFunc,
  openMenu
}) => {
  return (
    <Nav className={'app-bar'}>
      <Col xs={2}>
        {user && (
          <div onClick={openMenu()}>
            <ThreeBarsIcon size={35} className={'app-icon icon'} />
          </div>
        )}
        {!user && <MortarBoardIcon size={35} className={'app-icon'} />}
      </Col>
      <Col
        xs={{ offset: 5, span: 5 }}
        sm={{ offset: 7, span: 3 }}
        md={{ offset: 8, span: 2 }}
        xl={{ offset: 9, span: 1 }}
      >
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
