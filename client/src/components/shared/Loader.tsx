// ------ REACT ------
import React from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-png.png";

// ------ TYPESCRIPT ------
interface loaderProps {
  isLoading: boolean;
  message: string;
}

export default function Loader({ isLoading, message }: loaderProps) {
  return (
    <>
      {!isLoading || (
        <>
          <div className="mx-auto flex flex-col justify-around">
            <img src={spendilowLogo} className="max-w-sm self-center"></img>
            <span className="loading loading-bars loading-lg text-primary self-center"></span>
            <p className="font-heading text-neutral text-center">{message}</p>
          </div>
        </>
      )}
    </>
  );
}
