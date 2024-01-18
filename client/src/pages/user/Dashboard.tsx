// ------ REACT ------
import React, { useEffect } from "react";

import { dummyAuth } from "../../services/users/users-external-calls";

/**
 * !MODIFICARE USER LOGGED PER FAR USCIRE L'HEADER
 * */

export default function Dashboard() {

  useEffect( () =>{
    tryDummy()
  },[])

  async function tryDummy(){
    dummyAuth();
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
