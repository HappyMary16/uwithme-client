import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ChooseRole from "./components/ChooseRole";
import {USER_HOME} from "../../constants/links";
import {signInRequest} from "../../actions/authActions";
import {useNavigate} from "react-router-dom";

export default function PreHome() {

  const isRegistrationComplete = useSelector(state => state.authReducers.isRegistrationComplete);
  const user = useSelector(state => state.authReducers.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signInRequest());
    if (user) {
      navigate(USER_HOME);
    }
  }, [user, dispatch, navigate])

  return <div>{!isRegistrationComplete && <ChooseRole/>}</div>;
}
