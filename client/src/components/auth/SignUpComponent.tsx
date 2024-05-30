// ------ REACT ------
import React, { SyntheticEvent, useState } from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";

// ------ COMPONENTS & PAGES ------
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { signUpNewSpendilowUser } from "../../services/users/users-external-calls";
import { SpendilowUser } from "../../shared/interfaces";

export default function SignUpComponent() {
  // ------ HOOKS ------
  const [newSpendilowUser, setNewSpendilowUser] = useState<SpendilowUser>({
    email: "",
    password: "",
    savings: 0.0,
    salary: 0.0,
    profileimage: "",
    workfield: "",
    username: "",
    isMFAActive: false,
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
    if (event.target.name === "isMFAActive") {
      setNewSpendilowUser({
        ...newSpendilowUser,
        [event.target.name]: !newSpendilowUser.isMFAActive,
      });
    } else {
      setNewSpendilowUser({
        ...newSpendilowUser,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setNewSpendilowUser({
          ...newSpendilowUser,
          profileimage: base64String,
        });
      };

      reader.onerror = (error) => {
        alert(
          "Errore nel caricare l'immagine! Contatta il supporto. Errore: " +
            error
        );
      };

      reader.readAsDataURL(file);
    } else {
      alert(
        "Errore nel caricare l'immagine! Riprova, cambia immagine oppure contatta il supporto."
      );
    }
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
      newSpendilowUser.profileimage === "" ||
      newSpendilowUser.workfield === "" ||
      newSpendilowUser.username === ""
    ) {
      setSignUpError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      if (passwordCheck.test(newSpendilowUser.password!)) {
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
    const externalCallResult: string = await signUpNewSpendilowUser(
      newSpendilowUser
    ).finally(() => {
      setIsLoading(false);
    });

    externalCallResult.startsWith("/")
      ? (window.location.href =
          import.meta.env.VITE_BASENAME + externalCallResult)
      : setSignUpError({ state: true, message: externalCallResult });
  }

  return (
    <div className="hero min-h-screen text-neutral">
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
                type="file"
                id="image"
                name="image"
                accept="image/png, image/jpeg"
                placeholder="Foto profilo"
                className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                onChange={handleProfileImageChange}
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
              <label className="label cursor-pointer">
                <span className="label-text">
                  Attiva autenticazione a due fattori <br></br>(Verrai redirettə
                  dopo la registrazione)
                </span>
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="isMFAActive"
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              {isLoading ? (
                <>
                  <button className="btn btn-accent font-primary">
                    <span className="loading loading-dots loading-md"></span>
                  </button>
                </>
              ) : (
                <>
                  <input
                    type="submit"
                    className="btn btn-accent font-primary"
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
