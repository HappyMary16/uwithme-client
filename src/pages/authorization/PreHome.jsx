import React, {useEffect} from "react";
import ChooseRole from "./components/ChooseRole";
import {USER_HOME} from "../../constants/links";
import {useNavigate} from "react-router-dom";
import {useFetchUserQuery} from "../../store/user/userApiSlice";
import {getId} from "../../services/authService";
import {skipToken} from "@reduxjs/toolkit/query";

export default function PreHome() {

  const navigate = useNavigate();
  const {error, currentData, isFetching} = useFetchUserQuery(getId() ?? skipToken);

  useEffect(() => {
    if (!isFetching && currentData) {
      navigate(USER_HOME);
    }
  }, [currentData, isFetching, navigate])

  return <div>{error?.status === 404 && <ChooseRole/>}</div>;
}
