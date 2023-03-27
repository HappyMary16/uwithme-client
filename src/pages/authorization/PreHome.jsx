import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ChooseRole from "./components/ChooseRole";
import {USER_HOME} from "../../constants/links";
import {signInRequest} from "../../actions/authActions";
import {useNavigate} from "react-router-dom";
import {useFetchUserQuery} from "../../store/slices/authApiSlice";

export default function PreHome() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isRegistrationComplete = useSelector(state => state.authReducers.isRegistrationComplete);
  const {data: user} = useFetchUserQuery();

  useEffect(() => {
    dispatch(signInRequest());
    if (user) {
      navigate(USER_HOME);
    }
  }, [user, dispatch, navigate])

  return <div>{!isRegistrationComplete && <ChooseRole/>}</div>;
}
