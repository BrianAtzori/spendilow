// ------ REACT ------
import React, { useState } from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ COMPONENTS & PAGES ------

// ------ SERVICES ------
import { loginSpendilowUser } from "../../services/users/users-external-calls";

export default function LoginComponent() {
  // ------ HOOKS ------
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  // ------ FORM HANDLING ------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  // ------ FUNCTIONS ------

  return (
    <div className="hero min-h-screen text-neutral">
      <div className="hero-content flex-col desktop:flex-row-reverse">
        <div className="text-center desktop:text-left">
          <h1 className="text-5xl font-bold font-primary text-neutral">
            Accedi
          </h1>
          <p className="py-6 text-neutral font-heading">
            “Gli uomini non riescono a capire quale gran rendita costituisca il
            risparmio.” - Cicerone
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body font-body">
            <img src={spendilowLogo} />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="iltuoindirizzo@peraccedere.com"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="La tua password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary font-primary text-neutral">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
