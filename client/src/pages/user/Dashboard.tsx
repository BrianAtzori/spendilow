// ------ REACT ------
import React, { useEffect } from "react";

// ------ REDUX ------
import { useAppDispatch } from "../../redux/hooks";
import { changeUserLoggedState } from "../../redux/reducers/auth/userLoggedSlice";
import { updateUserProfile } from "../../redux/reducers/user/userProfileSlice";
import { useAppSelector } from "../../redux/hooks";

// ------ SERVICES ------
import { getSpendilowUserProfile } from "../../services/authenticated-users/authenticated-users-external-calls";

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

  const dispatch = useAppDispatch();

  const currentSpendilowUser: spendilowUserProfile = useAppSelector(
    (state) => state.userProfile.value
  );

  // ------ DATA ------
  const currentDate = new Date();

  //------ FUNCTIONS ------
  async function loadDashboard() {
    const spendilowUserProfile = await getSpendilowUserProfile();

    //TODO: ERROR HANDLING
    if (spendilowUserProfile) {
      dispatch(changeUserLoggedState());
      dispatch(updateUserProfile(spendilowUserProfile));
    }
  }

  //TODO: SVG ICONS
  return (
    <div className="hero min-h-screen tablet:place-items-start">
      <div className="hero-content flex-col gap-3 min-w-full">
        <div className="text-left card card-body bg-base-100 tablet:w-full">
          <h1 className="text-5xl font-bold font-primary">
            Benvenutə, {currentSpendilowUser.username}
          </h1>
          <div className="font-body">
            <p className="py-">Come andranno i tuoi risparmi questi mesi?</p>
            <p>
              Ricordati che gli sforzi vanno fatti giorno per giorno, inizia
              tracciando le tue spese e migliora un po' alla volta 🌱
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-around w-full tablet:flex-wrap tablet:flex-row tablet:justify-between desktop:justify-start">
          <div className="stats shadow font-heading tablet:w-5/12 tablet:max-w-xl ">
            <div className="stat">
              <div className="stat-figure text-secondary hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Oggi é il:</div>
              <div className="stat-value">
                {currentDate.getDay() +
                  "/" +
                  currentDate.getMonth() +
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
              <div className="stat-figure text-secondary hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">I tuoi risparmi:</div>
              <div className="stat-value">{currentSpendilowUser.savings}</div>
              <div className="stat-desc">Contiua cosí 🙌🏻'</div>
            </div>
          </div>
          <div className="stats shadow font-heading tablet:w-5/12 tablet:max-w-xl ">
            <div className="stat">
              <div className="stat-figure text-secondary hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Entrate mensili:</div>
              <div className="stat-value">{currentSpendilowUser.salary}</div>
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
              <div className="stat-figure text-secondary hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Sezione in costruzione</div>
              <div className="stat-value">{currentSpendilowUser.salary}</div>
              <div className="stat-desc">WORK IN PROGRESS 🚧</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
