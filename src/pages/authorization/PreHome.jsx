import React, {useEffect} from "react";
import ChooseRole from "./components/ChooseRole";
import {USER_HOME} from "../../constants/links";
import {useNavigate} from "react-router-dom";
import {useFetchUserQuery} from "../../store/slices/authApiSlice";

export default function PreHome() {

  const navigate = useNavigate();
  const {data, error} = useFetchUserQuery();

  useEffect(() => {
    if (data) {
      navigate(USER_HOME);
    }
  }, [data, navigate])

  return <div>{error?.status === 404 && <ChooseRole/>}</div>;
}
