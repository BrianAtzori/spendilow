// ------ REACT ------
import React, { useEffect, useState } from "react";

// ------ PAGES & COMPONENTS ------
import LoaderComponent from "../../components/shared/LoaderComponent";

// ------ REDUX ------
import { useAppDispatch } from "../../redux/hooks";
import { changeUserLoggedState } from "../../redux/reducers/auth/userLoggedSlice";
import { updateUserProfile } from "../../redux/reducers/user/userProfileSlice";
import { useAppSelector } from "../../redux/hooks";

// ------ SERVICES ------
import { getSpendilowUserProfile } from "../../services/authenticated-users/authenticated-users-external-calls";
import ErrorScreenComponent from "../../components/shared/ErrorScreenComponent";

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

export default function Dashboard() {
  //------ HOOKS ------
  useEffect(() => {
    loadDashboard();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const currentSpendilowUser: spendilowUserProfile = useAppSelector(
    (state) => state.userProfile.value
  );

  const [profileError, setProfileError] = useState({
    state: false,
    message: "Errore durante il caricamento del profilo",
  });

  // ------ DATA ------
  const currentDate = new Date();

  //------ FUNCTIONS ------
  async function loadDashboard() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const externalCallResult: any = await getSpendilowUserProfile().finally(
      () => {
        setIsLoading(false);
      }
    );

    if (typeof externalCallResult === "object") {
      dispatch(changeUserLoggedState(true));
      dispatch(updateUserProfile(externalCallResult));
    } else {
      setProfileError({ state: true, message: externalCallResult });
    }
  }

  return (
    <>
      <LoaderComponent
        isLoading={isLoading}
        message={"Caricamento del profilo in corso 💰"}
      ></LoaderComponent>

      {profileError.state ? (
        <>
          <ErrorScreenComponent
            message={profileError["message"]}
          ></ErrorScreenComponent>
        </>
      ) : (
        <>
          <div className="hero min-h-screen tablet:place-items-start">
            <div className="hero-content flex-col gap-3 min-w-full">
              <div className="text-left card card-body bg-base-100 tablet:w-full">
                <h1 className="text-5xl font-bold font-primary">
                  Benvenutə, {currentSpendilowUser.username}
                </h1>
                <div className="font-body">
                  <p className="py-">
                    Come andranno i tuoi risparmi questi mesi?
                  </p>
                  <p>
                    Ricordati che gli sforzi vanno fatti giorno per giorno,
                    inizia tracciando le tue spese e migliora un po' alla volta
                    🌱
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-3 justify-around w-full tablet:flex-wrap tablet:flex-row tablet:justify-between desktop:justify-start">
                <div className="stats shadow font-heading tablet:w-5/12 tablet:max-w-xl ">
                  <div className="stat">
                    <div className="stat-figure text-secondary hidden desktop:block">
                      <svg
                        className="w-6 h-6 text-accent dark:text-accent"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 5c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1a2 2 0 0 1 2 2v1c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V7c0-1.1.9-2 2-2ZM3 19v-7c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6-6c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1ZM7 17a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="stat-title">Oggi é il:</div>
                    <div className="stat-value">
                      {currentDate.getDate() +
                        "/" +
                        (currentDate.getMonth() + 1) +
                        "/" +
                        currentDate.getFullYear()}
                    </div>
                    <div className="stat-desc">
                      Sopravviverai fino alla prossima busta paga? 😂
                    </div>
                  </div>
                </div>
                <div className="stats shadow font-heading tablet:w-5/12  tablet:max-w-xl ">
                  <div className="stat">
                    <div className="stat-figure text-secondary hidden desktop:block">
                      <svg
                        className="w-6 h-6 text-accent dark:text-accent"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m13.5 8.3 3.8-3.9a1.5 1.5 0 0 1 2.1 0l.2.2a1.5 1.5 0 0 1 0 2l-3.9 4a4 4 0 0 0-2.2-2.3Zm0 0a4 4 0 0 1 2.2 2.2L19.4 7a9 9 0 0 1 0 10.2l-3.7-3.6m-2.2-5.2L17 4.6a9 9 0 0 0-10 0l3.6 3.7a4 4 0 0 0-2.2 2.2L4.6 7a9 9 0 0 0 0 10.2l3.7-3.6a4 4 0 0 0 2.2 2.2L7 19.4a9 9 0 0 0 10.2 0l-3.6-3.7a4 4 0 0 0 2.2-2.2m0 0 3.9 3.8a1.5 1.5 0 0 1 0 2.1l-.2.2a1.5 1.5 0 0 1-2 0l-4-3.9a4 4 0 0 0 2.3-2.2ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-7.7 1.5-3.9 3.8a1.5 1.5 0 0 0 0 2.1l.2.2a1.5 1.5 0 0 0 2 0l4-3.9a4 4 0 0 1-2.3-2.2Zm2.2-5.2L6.7 4.4a1.5 1.5 0 0 0-2.1 0l-.2.2a1.5 1.5 0 0 0 0 2l3.9 4a4 4 0 0 1 2.2-2.3Z"
                        />
                      </svg>
                    </div>
                    <div className="stat-title">I tuoi risparmi:</div>
                    <div className="stat-value">
                      {currentSpendilowUser.savings}
                    </div>
                    <div className="stat-desc">Contiua cosí 🙌🏻'</div>
                  </div>
                </div>
                <div className="stats shadow font-heading tablet:w-5/12 tablet:max-w-xl ">
                  <div className="stat">
                    <div className="stat-figure text-secondary hidden desktop:block">
                      <svg
                        className="w-6 h-6 text-accent dark:text-accent"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="stat-title">Entrate mensili:</div>
                    <div className="stat-value">
                      {currentSpendilowUser.salary}
                    </div>
                    <div className="stat-desc">
                      Lavorando come o nell'ambito di
                      <div className="badge badge-primary mx-2">
                        {currentSpendilowUser.workfield}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stats shadow font-heading tablet:w-5/12 tablet:max-w-xl ">
                  <div className="stat">
                    <div className="stat-figure text-secondary hidden desktop:block">
                      <svg
                        className="w-6 h-6 text-accent dark:text-accent"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="stat-title">Sezione in costruzione</div>
                    <div className="stat-value">
                      {currentSpendilowUser.salary}
                    </div>
                    <div className="stat-desc">WORK IN PROGRESS 🚧</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
