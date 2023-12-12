// ------ REACT ------
import React, { SyntheticEvent, useState } from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ SERVICES ------
import { signUpNewSpendilowUser } from "../../services/users/users-external-calls";

//**! RIFARE CON FORMIK o USEFORMS */
//**! AGGIUNGERE LOADER AL BOTTONE */
//**! AGGIUNGERE INPUT CLEANING */

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
    <div className="hero min-h-screen text-neutral my-10">
      <div className="hero-content flex-col desktop:flex-row-reverse">
        <div className="text-center desktop:text-left">
          <h1 className="text-5xl font-bold font-primary">Registrati</h1>
          <p className="py-6 font-heading">
            “Se aggiungi poco al poco, ma lo farai di frequente, presto il poco
            diventerà molto.” - Esiodo
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body font-body" onSubmit={signUp}>
            <img src={spendilowLogo} />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Indirizzo Email</span>
              </label>
              <input
                className="input input-bordered"
                id="email"
                name="email"
                placeholder="Indirizzo Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                required
                onChange={handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Risparmi</span>
              </label>
              <input
                className="input input-bordered"
                id="savings"
                name="savings"
                placeholder="Risparmi"
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stipendio Medio Mensile</span>
              </label>
              <input
                className="input input-bordered"
                id="salary"
                name="salary"
                placeholder="Stipendio"
                onChange={handleChange}
                type="number"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Foto Profilo</span>
              </label>
              <input
                id="image"
                name="image"
                className="input input-bordered"
                placeholder="Foto profilo"
                value="https://i.pravatar.cc/150"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ambito Di Lavoro</span>
              </label>
              <input
                className="input input-bordered"
                id="workfield"
                name="workfield"
                placeholder="Ambito lavoro"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                className="input input-bordered"
                id="username"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="submit"
                className="btn btn-primary font-primary"
                value="Registrati"
              ></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
