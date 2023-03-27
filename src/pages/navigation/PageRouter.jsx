import React, {Fragment} from 'react';
import {hasAnyRole} from "../../services/authService";

export function PageRouter({ roles, children }) {
  return (
    <Fragment>
      {hasAnyRole(roles) && children}
    </Fragment>
  );
}
