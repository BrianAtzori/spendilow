import React, { useState, SyntheticEvent } from 'react';

import spendilowLogo from '../../assets/logo/spendilow-logo-svg.svg';

import ErrorComponent from '../shared/ErrorComponent';

import { loginSpendilowUser } from '../../services/users/users-external-calls';

import { SpendilowUserLogin } from '../../shared/interfaces';

export default function LoginComponent() {
  const [userCredentials, setUserCredentials] = useState<SpendilowUserLogin>({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState({
    state: false,
    message: 'Errore in fase di login',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserCredentials({
      ...userCredentials,
      [event.target.name]: event.target.value,
    });
  };

  async function verifyInputThenTriggerLogin(event: SyntheticEvent) {
    event.preventDefault();
    setLoginError({
      state: false,
      message: '',
    });

    if (userCredentials.email === '' || userCredentials.password === '') {
      setLoginError({
        state: true,
        message: 'Verifica i dati inseriti, alcuni campi sono vuoti!',
      });
    } else {
      setIsLoading(true);
      await login();
    }
  }

  async function login() {
    const externalCallResult: string = await loginSpendilowUser(userCredentials).finally(() => {
      setIsLoading(false);
    });

    externalCallResult.startsWith('/')
      ? (window.location.href = import.meta.env.VITE_BASENAME + externalCallResult)
      : setLoginError({ state: true, message: externalCallResult });
  }

  return (
    <div className='hero min-h-screen text-neutral'>
      <div className='hero-content flex-col desktop:flex-row-reverse'>
        <div className='text-center desktop:text-left'>
          <h1 className='text-5xl font-bold font-primary text-neutral'>Accedi</h1>
          <p className='py-6 text-neutral font-heading'>
            “Gli uomini non riescono a capire quale gran rendita costituisca il risparmio.” -
            Cicerone
          </p>
        </div>
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <form className='card-body font-body' onSubmit={verifyInputThenTriggerLogin}>
            <img src={spendilowLogo} />
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                id='email'
                name='email'
                type='email'
                placeholder='iltuoindirizzo@peraccedere.com'
                className='input input-bordered'
                onChange={handleChange}
              />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Password</span>
              </label>
              <input
                id='password'
                name='password'
                type='password'
                placeholder='La tua password'
                className='input input-bordered'
                onChange={handleChange}
              />
            </div>
            <div className='form-control'>
              {loginError.state && <ErrorComponent message={loginError.message}></ErrorComponent>}
            </div>
            <div className='form-control mt-6'>
              <div className='form-control'>
                {isLoading ? (
                  <>
                    <button className='btn btn-accent font-primary bg-accent'>
                      <span className='loading loading-dots loading-md'></span>
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      type='submit'
                      className='btn btn-accent font-primary bg-accent'
                      value='Accedi'
                    ></input>
                  </>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
