import React, {useEffect} from 'react';
import {ADMIN} from "../../../constants/userRoles";
import UniversityStructure from "../../admin/structure/UniversityStructure";
import UserHome from "../../user/home/containers/UserHome";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {PRE_HOME} from "../../../constants/links";

export default function Home() {

  const navigate = useNavigate();

  const user = useSelector(state => state.authReducers.user);

  useEffect(() => {
    !user && navigate(PRE_HOME);
  }, [user, navigate]);


  return (
    <div>
      {user?.activeRole === ADMIN && <UniversityStructure/>}
      {user && user.activeRole !== ADMIN && <UserHome/>}
    </div>
  );
};
