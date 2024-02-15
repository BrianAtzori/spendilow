// ------ REACT ------
import React, { useEffect } from "react";

//------ REDUX ------
import { useAppDispatch } from "../../redux/hooks";
import { changeUserLoggedState } from "../../redux/reducers/auth/userLoggedSlice";

//------ SERVICES ------
import { getSpendilowUserProfile } from "../../services/authenticated-users/authenticated-users-external-calls";

export default function Dashboard() {
  //------ HOOKS ------
  useEffect(() => {
    tryDummy();
  }, []);

  const dispatch = useAppDispatch();

  //------ FUNCTIONS ------
  async function tryDummy() {
    const dummyTestAuth = await getSpendilowUserProfile();

    if (dummyTestAuth) {
      dispatch(changeUserLoggedState());
    }
  }

  return (
    <div className="hero min-h-screen text-neutral">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold font-heading">Dashboard</h1>
          <p className="py-6 font-body">WORK IN PROGRESS 🏗️ 🚧 👷🏻‍♂️</p>
        </div>
      </div>
    </div>
  );
}
