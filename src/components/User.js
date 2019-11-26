import { Link } from 'react-router-dom';
import React, { Fragment } from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';

const User = styled.div`
  margin-bottom: 15px;
  background-color: lightgray;
`;

export default ({ user }) => (
  <User>
    <Avatar
      alt="Remy Sharp"
      src="/static/images/avatar/1.jpg"
      className={classes.bigAvatar}
    />
    <text>${user.firstName}</text>
    <text>${user.lastName}</text>
    <text>${user.phone}</text>
    <text>${user.email}</text>
    <text>
      Прізвище ім'я університет (староста не староста) група курс кафедра
      факультет номер залікової книжки телефон електронна адреса
    </text>
  </User>
);
