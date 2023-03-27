import React, {useEffect} from 'react';
import {ADMIN} from "../../../constants/userRoles";
import UniversityStructure from "../../admin/structure/UniversityStructure";
import UserHome from "../../user/home/containers/UserHome";
import {useNavigate} from "react-router-dom";
import {PRE_HOME} from "../../../constants/links";
import {useFetchUserQuery} from "../../../store/slices/authApiSlice";
import {useSelector} from "react-redux";
import {selectActiveRole} from "../../../store/slices/authSlice";

export default function Home() {

  const navigate = useNavigate();

  const user = useFetchUserQuery().data;
  const role = useSelector(selectActiveRole);

  useEffect(() => {
    !user && navigate(PRE_HOME);
  }, [user, navigate]);


  return (
    <div>
      {role === ADMIN && <UniversityStructure/>}
      {user && role !== ADMIN && <UserHome/>}
    </div>
  );
};
