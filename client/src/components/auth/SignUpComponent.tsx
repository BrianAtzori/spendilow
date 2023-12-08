// ------ REACT ------
import React, { SyntheticEvent, useState } from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ SERVICES ------
import { signUpNewSpendilowUser } from "../../services/users/users-external-calls";

//**! RIFARE CON FORMIK o USEFORMS */

export default function SignUpComponent() {
  const [newSpendilowUser, setNewSpendilowUser] = useState({
    email: "",
    password: "",
    savings: 0.0,
    salary: 0.0,
    profileImage: "",
    workfield: "",
    username: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSpendilowUser({
      ...newSpendilowUser,
      [event.target.name]: event.target.value,
    });
  };

  async function signUp(event: SyntheticEvent) {
    event.preventDefault();
    signUpNewSpendilowUser(newSpendilowUser);
  }

  return (
    <div className="hero min-h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 text-neutral font-body">
        <form className="card-body" onSubmit={signUp}>
          <img src={spendilowLogo} />
          <input
            className="form-control"
            id="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            className="form-control"
            id="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
          />
          <input
            className="form-control"
            id="savings"
            name="savings"
            placeholder="savings"
            onChange={handleChange}
          />
          <input
            className="form-control"
            id="salary"
            name="salary"
            placeholder="salary"
            onChange={handleChange}
          />
          <input
            id=""
            name=""
            className="form-control"
            placeholder="image"
            value="https://i.pravatar.cc/150"
          />
          <input
            className="form-control"
            id="workfield"
            name="workfield"
            placeholder="workfield"
            onChange={handleChange}
          />
          <input
            className="form-control"
            id="username"
            name="username"
            placeholder="username"
            onChange={handleChange}
          />
          <input
            type="submit"
            className="bg-primary font-primary"
            value="Registrati"
          ></input>
        </form>
      </div>
    </div>
  );
}
