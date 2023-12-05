import React from "react";

interface loaderProps {
  isLoading: boolean;
  message: string;
}

export default function Loader({ isLoading, message }: loaderProps) {
  return (
    <>
      {!isLoading || (
        <>
          <div className="mx-auto">
            <span className="loading loading-bars loading-lg text-primary"></span>
            <p>{message}</p>
          </div>
        </>
      )}
    </>
  );
}
