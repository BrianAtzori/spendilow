// ------ REACT ------
import React, { useState } from "react";
import { useParams } from "react-router-dom";

export default function AuthForm() {
  const { mode } = useParams();
  const [authMode] = useState(mode);

  return <>{authMode}</>;
}
