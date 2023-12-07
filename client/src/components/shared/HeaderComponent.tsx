// ------ REACT ------
import React from "react";

// ------ ASSETS ------
import spendilowLogo from "../../assets/logo/spendilow-logo-svg.svg";
import { TiThMenu } from "react-icons/ti";

export default function HeaderComponent() {
  return (
    <>
      <div className="drawer font-heading text-neutral bg-base-100 z-10">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar border-solid border-primary border-b-4">
            <div className="flex-none desktop:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost text-xl text-neutral"
              >
                <TiThMenu />
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <img src={spendilowLogo} className="max-w-[100px]" />
            </div>
            <div className="flex-none hidden desktop:block">
              <ul className="menu menu-horizontal">
                <li>
                  <a>Navbar Item 1</a>
                </li>
                <li>
                  <a>Navbar Item 2</a>
                </li>
              </ul>
            </div>
          </div>
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100">
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
