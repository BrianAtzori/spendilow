import { useState } from 'react';
import ErrorComponent from '../shared/ErrorComponent';
import { useAppDispatch } from '../../redux/hooks';
import { changeUserLoggedState } from '../../redux/reducers/auth/userLoggedSlice';
import { logoutSpendilowUserProfile } from '../../services/authenticated-users/authenticated-users-external-calls';

export default function ChangeOrLogoutComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const [profileError, setProfileError] = useState({
    state: false,
    message: 'Errore durante il logout dal profilo',
  });

  const dispatch = useAppDispatch();

  async function deleteCookiesAndLogout(operation: string) {
    const response = confirm('Vuoi uscire dal tuo profilo?');
    setIsLoading(true);

    if (response) {
      const externalCallResult: string = await logoutSpendilowUserProfile(operation).finally(() => {
        setIsLoading(false);
      });

      if (externalCallResult.startsWith('/')) {
        dispatch(changeUserLoggedState(false));
        window.location.href = import.meta.env.VITE_BASENAME + externalCallResult;
      } else {
        setProfileError({ state: true, message: externalCallResult });
      }
    } else {
      setIsLoading(false);
    }
  }

  return (
    <div className='text-neutral py-6'>
      <div className='hero-content flex-col desktop:flex-row-reverse'>
        <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
          <div className='card-body font-body'>
            <div className='form-control'>
              {isLoading ? (
                <>
                  <button className='btn btn-accent font-primary'>
                    <span className='loading loading-dots loading-md'></span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className='btn btn-accent font-primary bg-accent'
                    onClick={() => deleteCookiesAndLogout('change')}
                  >
                    🔄 Cambia profilo
                  </button>
                </>
              )}
            </div>
            <div className='form-control'>
              {isLoading ? (
                <>
                  <button className='btn btn-accent font-primary'>
                    <span className='loading loading-dots loading-md'></span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className='btn btn-accent font-primary bg-accent'
                    onClick={() => deleteCookiesAndLogout('logout')}
                  >
                    🚪 Logout
                  </button>
                </>
              )}
            </div>
            <div className='form-control'>
              {profileError.state && (
                <ErrorComponent message={profileError.message}></ErrorComponent>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
