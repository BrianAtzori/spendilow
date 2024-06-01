// ------ REACT ------
import React from 'react';
import { Link } from 'react-router-dom';

// ------ ASSETS ------
import spendilowLogo from '../../assets/logo/spendilow-logo-svg.svg';
import { TiThMenu } from 'react-icons/ti';

// ------ REDUX ------
import { useAppSelector } from '../../redux/hooks';

export default function HeaderComponent() {
  const userProfilePic: string = useAppSelector((state) => state.userProfile.value.profileimage);

  return (
    <>
      <div className='drawer font-heading text-neutral bg-base-100 z-10'>
        <input id='my-drawer-3' type='checkbox' className='drawer-toggle' />
        <div className='drawer-content flex flex-col'>
          <div className='w-full navbar border-solid border-primary border-b-4'>
            <div className='flex-none desktop:hidden'>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='btn btn-square btn-ghost text-xl text-neutral'
              >
                <TiThMenu />
              </label>
            </div>
            <div className='flex-1 px-2 mx-2'>
              <img src={spendilowLogo} className='max-w-[100px]' />
            </div>
            <div className='flex-none hidden desktop:block'>
              <ul className='menu menu-horizontal'>
                <li>
                  <Link to='/user/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link to='/user/expenses'>Spese</Link>
                </li>
                <li>
                  <Link to='/user/budget'>Budget</Link>
                </li>
                <li>
                  <Link to='/user/settings'>Impostazioni </Link>
                </li>
              </ul>
            </div>
            <div className='avatar'>
              <div className='w-16 m-2 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
                <Link to='/user/settings'>
                  <img src={userProfilePic} />{' '}
                </Link>
              </div>
            </div>
          </div>
          {/* Page content here */}
        </div>
        <div className='drawer-side'>
          <label
            htmlFor='my-drawer-3'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu p-4 w-80 min-h-full bg-base-100'>
            {/* Sidebar content here */}
            <li>
              <Link to='/user/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to='/user/expenses'>Spese</Link>
            </li>
            <li>
              <Link to='/user/budget'>Budget</Link>
            </li>
            <li>
              <Link to='/user/settings'>Impostazioni </Link>
            </li>
            <div className='flex-1 px-2 mx-2'>
              <div className='divider'></div>
              <img src={spendilowLogo} className='' />
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}
