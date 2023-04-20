import React, {useEffect} from 'react';
import {ADMIN} from "../../constants/userRoles";
import UniversityStructure from "../department/UniversityStructure";
import UserHome from "./UserHome";
import {useNavigate} from "react-router-dom";
import {PRE_HOME} from "../../constants/links";
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {useSelector} from "react-redux";
import {selectActiveRole} from "../../store/user/authSlice";
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";

export default function Home() {

  const navigate = useNavigate();

  const {data: user, isFetching} = useFetchUserQuery(getId() ?? skipToken);
  const role = useSelector(selectActiveRole);

  useEffect(() => {
    !user && !isFetching && navigate(PRE_HOME);
  }, [user, isFetching, navigate]);


  return (
    <div>
      {role === ADMIN && <UniversityStructure/>}
      {user && role !== ADMIN && <UserHome/>}
    </div>
  );
};
