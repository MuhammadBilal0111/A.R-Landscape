import React, { useEffect, useState } from "react";
import { signOut } from "../../../services/GlobalApi";
import { signOutSuccess, signOutFailure } from "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastFailure, ToastSuccess } from "../../../components/Toast";
import { useDispatch, useSelector } from "react-redux";

function Logout() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const res = await signOut(currentUser.userInfo._id); // function for sign out
        dispatch(signOutSuccess());
        ToastSuccess("Log out successfully as an admin!");
        navigate("/");
      } catch (err) {
        console.log(err);
        ToastFailure(err.message);
        dispatch(signOutFailure(err.message));
      }
    };
    handleLogout();
  }, []);
  return <></>;
}

export default Logout;
