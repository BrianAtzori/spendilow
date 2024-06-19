import { Link } from 'react-router-dom';
import landingImage from '../../assets/auth/landing-image-piggy.jpeg';
import { useEffect, useState } from 'react';
import { verifyUserAccess } from '../../services/authenticated-users/authenticated-users-external-calls';
import LoaderComponent from '../../components/shared/LoaderComponent';

export default function Landing() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (
      document.cookie.indexOf('spendilow-access-token') ||
      document.cookie.indexOf('spendilow-refresh-token')
    ) {
      accessTest();
    }
  });

  async function accessTest() {
    const externalCallResult: boolean | string = await verifyUserAccess().finally(() => {
      setIsLoading(false);
    });

    if (typeof externalCallResult != 'string') {
      window.location.href = import.meta.env.VITE_BASENAME + '/user/dashboard';
    }
  }

  return (
    <div className='hero min-h-screen text-neutral'>
      <div className='hero-content flex-col desktop:flex-row-reverse'>
        <LoaderComponent
          isLoading={isLoading}
          // eslint-disable-next-line prettier/prettier, quotes
          message={"Verifica dell'accesso in corso 💰"}
        ></LoaderComponent>
        <>
          <div className='hidden desktop:card desktop:shrink-0 desktop:w-full desktop:max-w-sm desktop:shadow-2xl desktop:bg-base-100'>
            <div className='card-body p-0'>
              <img src={landingImage} className='rounded-lg shadow-2xl' />
            </div>
          </div>
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 font-heading text-neutral'>
            <form className='card-body'>
              <div className='text-neutral'>
                <div className='text-center'>
                  <h1 className='text-5xl font-bold font-primary'>Benvenuto in Spendilow!</h1>
                  <p className='pt-6 font-body text-neutral'>
                    Monitora le spese, pianifica il futuro e raggiungi i tuoi obiettivi finanziari
                    con facilità. <br></br>
                    Inizia il tuo percorso verso una vita finanziaria più sicura e consapevole oggi
                    stesso.
                  </p>
                </div>
              </div>
              <div className='form-control mt-6'>
                <Link
                  to='/auth/login'
                  className='btn btn-accent font-primary font-bold text-neutral'
                >
                  Accedi
                </Link>
                <div className='form-control mt-6'>
                  <Link
                    to='/auth/sign-up'
                    className='btn btn-accent font-primary font-bold text-neutral'
                  >
                    Registrati
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </>
      </div>
    </div>
  );
}
