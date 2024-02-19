//------ REACT ------
import React, { SyntheticEvent, useState } from "react";

//------ REDUX ------
import { useAppSelector } from "../../redux/hooks";

// ------ COMPONENTS & PAGES ------
import ErrorComponent from "../shared/ErrorComponent";

// ------ SERVICES ------
import { editSpendilowUserProfile } from "../../services/authenticated-users/authenticated-users-external-calls";

// ------ TYPESCRIPT ------
interface spendilowUserProfile {
  id: string;
  email: string;
  isMFAActive: boolean;
  savings: number;
  salary: number;
  profileimage: string;
  workfield: string;
  username: string;
}

export default function UserEditProfileComponent() {
  // ------ HOOKS ------
  const currentSpendilowUser: spendilowUserProfile = useAppSelector(
    (state) => state.userProfile.value
  );

  const [isLoading, setIsLoading] = useState(false);

  const [editError, setEditError] = useState({
    state: false,
    message: "Errore durante la modifica del profilo",
  });

  const [inEditSpendilowUser, setInEditSpendilowUser] =
    useState(currentSpendilowUser);

  // ------ FORM HANDLING ------
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInEditSpendilowUser({
      ...inEditSpendilowUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        setInEditSpendilowUser({
          ...inEditSpendilowUser,
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

  //TODO: FIX DUPLICATE EMAIL ISSUE
  // TODO: RELOAD PROFILE AFTER EDITING
  // TODO: ERROR HANDLING

  async function verifyInputThenTriggerEditProfile(event: SyntheticEvent) {
    event.preventDefault();

    setEditError({
      state: false,
      message: "",
    });

    if (
      inEditSpendilowUser.email === "" ||
      inEditSpendilowUser.profileimage === "" ||
      inEditSpendilowUser.workfield === "" ||
      inEditSpendilowUser.username === ""
    ) {
      setEditError({
        state: true,
        message: "Verifica i dati inseriti, alcuni campi sono vuoti!",
      });
    } else {
      setIsLoading(true);
      await editProfile();
    }
  }

  // ------ FUNCTIONS ------
  async function editProfile() {
    const response = confirm("Vuoi eliminare il tuo profilo?");
    setIsLoading(true);

    if (response) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const externalCallResult: any = await editSpendilowUserProfile(
        inEditSpendilowUser
      ).finally(() => {
        setIsLoading(false);
      });

      externalCallResult.startsWith("/")
        ? (window.location.href = externalCallResult)
        : setEditError({ state: true, message: externalCallResult });
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className="hero min-h-screen text-neutral py-6">
      <div className="hero-content flex-col desktop:flex-row-reverse">
        <div className="text-center desktop:text-left">
          <h1 className="text-5xl font-bold font-primary">Impostazioni</h1>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form
            className="card-body font-body"
            onSubmit={verifyInputThenTriggerEditProfile}
          >
            <div className="text-center desktop:text-left">
              <h2 className="font-bold font-heading text-left">
                Modifica il tuo profilo
              </h2>
            </div>
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
                defaultValue={inEditSpendilowUser.email}
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
                defaultValue={inEditSpendilowUser.savings}
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
                defaultValue={inEditSpendilowUser.salary}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Foto Profilo</span>
              </label>
              <input
                type="file"
                id="profileimage"
                name="profileimage"
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
                defaultValue={inEditSpendilowUser.workfield}
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
                defaultValue={inEditSpendilowUser.username}
              />
            </div>
            <div className="form-control">
              {editError.state && (
                <ErrorComponent message={editError.message}></ErrorComponent>
              )}
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
                    value="Modifica il profilo"
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
