import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getCards } from "../../actions/cardActions";
import { getAdminUsers } from "../../actions/adminAction";
import Login from "../../components/Login";
import Signup from "../../components/Signup";
import "./style.css";


export default function Auth({isAdmin = false}) {
  const [authType, setAuthType] = useState("login");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo: signInUserInfo } = userSignin;
  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: signUpUserInfo } = userRegister;
  const adminSignin = useSelector((state) => state.adminSignin);
  const { adminInfo: signInAdminInfo } = adminSignin;
  const adminRegister = useSelector((state) => state.adminRegister);
  const { adminInfo: signUpAdminInfo } = adminRegister;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(!isAdmin) {
      if (signUpUserInfo || signInUserInfo) {
        dispatch(getCards());
        navigate("/");
      }
    }
    else {
      if (signInAdminInfo || signUpAdminInfo) {
        // dispatch(getAdminUsers());
        navigate("/admin/users");
      }
    }
  }, [isAdmin, signInUserInfo, signUpUserInfo, signInAdminInfo, signUpAdminInfo, dispatch, navigate]);

  return (
    <div className="Auth">
      {authType === "login" && <Login setAuthType={setAuthType} isAdmin = {isAdmin}/>}
      {authType === "signup" && <Signup setAuthType={setAuthType} isAdmin = {isAdmin}/>}
    </div>
  );
}