//------ REACT ------
import React from "react";

// ------ COMPONENTS & PAGES ------
import UserEditProfileComponent from "../../components/settings/UserEditProfileComponent";
import ChangeOrLogoutComponent from "../../components/settings/ChangeOrLogoutComponent";
import UserAccountDeletionComponent from "../../components/settings/UserAccountDeletionComponent";

export default function Settings() {
  return (
    <>
      <UserEditProfileComponent></UserEditProfileComponent>
      <div>
        <div className="divider font-primary mx-8"> 🚪 Profili & Logout </div>
        <ChangeOrLogoutComponent></ChangeOrLogoutComponent>
        <div className="divider font-primary divider-error mx-8">
          ❌ Zona Pericolosa
        </div>
        <UserAccountDeletionComponent></UserAccountDeletionComponent>
      </div>
    </>
  );
}
