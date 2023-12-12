// ------ REACT ------
import React from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ SERVICES ------
import { signUpNewSpendilowUser } from "../../services/users/users-external-calls";

// ------ PACKAGES ------
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import ErrorComponent from "../shared/ErrorComponent";

//**! AGGIUNGERE LOADER AL BOTTONE */
//**! AGGIUNGERE INPUT CLEANING */
//**! https://blog.logrocket.com/react-hook-form-complete-guide/ */

export default function SignUpComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const signUp = async (newSpendilowUser: any) => {
    signUpNewSpendilowUser(newSpendilowUser);
  };

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
          <form className="card-body font-body" onSubmit={handleSubmit(signUp)}>
            <img src={spendilowLogo} />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Indirizzo Email</span>
              </label>
              <input
                className="input input-bordered"
                placeholder="Indirizzo Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                {...register("password", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Risparmi</span>
              </label>
              <input
                className="input input-bordered"
                placeholder="Risparmi"
                type="number"
                {...register("savings", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stipendio Medio Mensile</span>
              </label>
              <input
                className="input input-bordered"
                placeholder="Stipendio"
                type="number"
                {...register("salary", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Foto Profilo</span>
              </label>
              <input
                className="input input-bordered"
                placeholder="Foto profilo"
                {...register("image", {
                  required: true,
                  value: "https://i.pravatar.cc/150",
                })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ambito Di Lavoro</span>
              </label>
              <input
                className="input input-bordered"
                {...register("workfield", { required: true })}
                placeholder="Ambito lavoro"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                className="input input-bordered"
                placeholder="Username"
                {...register("username", { required: true })}
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
