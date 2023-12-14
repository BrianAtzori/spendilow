// ------ REACT ------
import React, { SyntheticEvent, useState } from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ COMPONENTS & PAGES ------
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { signUpNewSpendilowUser } from "../../services/users/users-external-calls";

export default function SignUpComponent() {
  // ------ HOOKS ------
  const [newSpendilowUser, setNewSpendilowUser] = useState({
    email: "",
    password: "",
    savings: 0.0,
    salary: 0.0,
    profileImage: "https://i.pravatar.cc/150",
    workfield: "",
    username: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [signUpError, setSignUpError] = useState({
    state: false,
    message: "Errore in fase di registrazione",
  });

  // ------ FORM HANDLING ------

  const passwordCheck = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(?=.*[a-zA-Z\d@#$%^&+=]).{8,}$/
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSpendilowUser({
      ...newSpendilowUser,
      [event.target.name]: event.target.value,
    });
  };

  async function verifyInputThenTriggerSignUp(event: SyntheticEvent) {
    event.preventDefault();

    setSignUpError({
      state: false,
      message: "",
    });

    if (
      newSpendilowUser.email === "" ||
      newSpendilowUser.password === "" ||
      newSpendilowUser.profileImage === "" ||
      newSpendilowUser.workfield === "" ||
      newSpendilowUser.username === ""
    ) {
      setSignUpError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      if (passwordCheck.test(newSpendilowUser.password)) {
        setIsLoading(true);
        await signUp();
      } else {
        setSignUpError({
          state: true,
          message:
            "La password deve contenere almeno 8 caratteri e almeno una lettera minuscola, una lettera maiuscola, un numero e un carattere speciale tra @, #, $, %, ^, &, + e =",
        });
      }
    }
  }

  // ------ FUNCTIONS ------

  async function signUp() {
    await signUpNewSpendilowUser(newSpendilowUser);
    setIsLoading(false);
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
          <form
            className="card-body font-body"
            onSubmit={verifyInputThenTriggerSignUp}
          >
            <img src={spendilowLogo} />
            <div className="form-control">
              <label className="label">
                <span className="label-text">Indirizzo Email</span>
              </label>
              <input
                className="input input-bordered"
                type="email"
                id="email"
                name="email"
                placeholder="Indirizzo Email"
                onChange={handleChange}
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
              />
            </div>
            <div className="form-control">
              {signUpError.state && (
                <ErrorComponent message={signUpError.message}></ErrorComponent>
              )}
            </div>
            <div className="form-control">
              {isLoading ? (
                <>
                  <button className="btn btn-primary font-primary">
                    <span className="loading loading-dots loading-md"></span>
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="submit"
                    className="btn btn-primary font-primary"
                    value="Registrati"
                  ></input>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
