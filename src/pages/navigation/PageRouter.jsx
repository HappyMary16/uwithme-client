import React, {Fragment} from 'react';
import {hasAnyRole} from "../../services/authService";

export const PageRouter = ({ roles, children }) => {
  return (
    <Fragment>
      {hasAnyRole(roles) && children}
    </Fragment>
  );
};
