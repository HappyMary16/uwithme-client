import React from 'react';
import { ADD_UNIVERSITY_PATH, SIGN_IN } from '../../constants/links';
import i18n from '../../locales/i18n';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './navigation.css';
import { MortarBoardIcon, ThreeBarsIcon } from '@primer/octicons-react';
import Col from 'react-bootstrap/Col';

export const TopToolBar = ({ user, signOutFunc, openMenu }) => {
  return (
    <Nav className={'app-bar'}>
      {user && (
        <Col xs={2}>
          <div onClick={openMenu()}>
            <ThreeBarsIcon size={35} className={'app-icon icon'} />
          </div>
        </Col>
      )}
      {user && (
        <Col
          xs={{ offset: 6, span: 4 }}
          sm={{ offset: 7, span: 3 }}
          md={{ offset: 8, span: 2 }}
          xl={{ offset: 9, span: 1 }}
        >
          <Button
            href="/sign-in"
            variant={'purple'}
            className={'menu-btn'}
            onClick={signOutFunc()}
            block
          >
            {i18n.t('sign_out')}
          </Button>
        </Col>
      )}

      {!user && (
        <Col xs={2} sm={1}>
          <MortarBoardIcon size={35} className={'app-icon'} />
        </Col>
      )}
      {!user && (
        <Col
          xs={{ offset: 1, span: 6 }}
          sm={{ offset: 3, span: 5 }}
          md={{ offset: 5, span: 4 }}
          lg={{ offset: 6, span: 3 }}
          xl={{ offset: 8, span: 2 }}
        >
          <Button
            href={ADD_UNIVERSITY_PATH}
            variant={'purple'}
            className={'menu-btn'}
            block
          >
            {i18n.t('add_university')}
          </Button>
        </Col>
      )}
      {!user && (
        <Col xs={3} sm={3} md={2} lg={2} xl={1}>
          <Button
            href={SIGN_IN}
            variant={'purple'}
            className={'menu-btn'}
            block
          >
            {i18n.t('sign_in')}
          </Button>
        </Col>
      )}
    </Nav>
  );
};
