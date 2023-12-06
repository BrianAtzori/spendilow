// ------ REACT ------
import React from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-png.png";

// ------ TYPESCRIPT ------
interface errorProps {
  message: string;
}

export default function ErrorComponent({ message }: errorProps) {
  return (
    <div className="mx-auto flex flex-col justify-around">
      <img src={spendilowLogo} className="max-w-sm self-center"></img>
      <div
        role="alert"
        className="alert alert-error w-4/6 self-center font-heading text-neutral"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{message}</span>
      </div>
    </div>
  );
}
