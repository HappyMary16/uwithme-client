import {Fragment} from 'react';
import {useSelector} from "react-redux";
import {selectActiveRole} from "../../store/user/authSlice";

export function PageRouter({roles, children}) {

  const activeRole = useSelector(selectActiveRole);

  return (
    <Fragment>
      {roles.includes(activeRole) && children}
    </Fragment>
  );
}
