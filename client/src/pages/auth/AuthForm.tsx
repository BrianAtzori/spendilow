// ------ REACT ------
import React, { useState } from "react";
import { useParams } from "react-router-dom";

// ------ COMPONENTS & PAGES ------
import SignUpComponent from "../../components/auth/SignUpComponent";
import LoginComponent from "../../components/auth/LoginComponent";

export default function AuthForm() {
  const { mode } = useParams();
  const [authMode] = useState(mode);

  return (
    <>
      {authMode === "login" ? (
        <LoginComponent></LoginComponent>
      ) : (
        <SignUpComponent></SignUpComponent>
      )}
    </>
  );
} 
