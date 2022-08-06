import React from "react";
import { signOut } from "firebase/auth";
import { authService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const LogOutClick = () => {
    signOut(authService);
    navigate("/", { replace: true });
  };

  return <button onClick={LogOutClick}>Log Out</button>;
};

export default Profile;
