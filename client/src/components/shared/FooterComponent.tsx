// ------ REACT ------
import React from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";
import { IoLogoGithub } from "react-icons/io";
import { IoLogoLinkedin } from "react-icons/io";
import { SiLinktree } from "react-icons/si";

export default function FooterComponent() {
  return (
    <>
      <footer className="footer footer-center p-10 bg-base-100 border-solid border-primary border-t-4 font-heading text-neutral">
        <aside>
          <img src={spendilowLogo} className="tablet:max-w-xs" />
          <p className="font-bold">
            Fatto da me con amore ❤ <br />
            P.IVA: 03929620122
          </p>
          <p>Copyright © 2023 - Brian Atzori </p>
        </aside>
        <nav className="text-neutral text-2xl" >
          <div className="grid grid-flow-col gap-4">
            <a>
              <IoLogoGithub />
            </a>
            <a>
              <IoLogoLinkedin />
            </a>
            <a>
              <SiLinktree />
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}
