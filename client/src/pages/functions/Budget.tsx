import React, { useEffect, useState } from 'react';
import UserBudgetsWidgets from '../../components/user/UserBudgetsWidgets';
import { getSpendilowUserBudgets } from '../../services/authenticated-users/budgets/auth-usr-budgets-external-calls';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserBudgets } from '../../redux/reducers/budgets/userBudgetSlice';
import { Link } from 'react-router-dom';
import DataDisplayerComponent from '../../components/shared/DataDisplayerComponent';
import ErrorScreenComponent from '../../components/shared/ErrorScreenComponent';
import LoaderComponent from '../../components/shared/LoaderComponent';
import { ExternalCallResult } from '../../shared/interfaces';
import { changeUserLoggedState } from '../../redux/reducers/auth/userLoggedSlice';
import { useLoadUserProfile } from '../../hooks/useLoadUserProfile';

export default function Budget() {
  const dispatch = useAppDispatch();

  useLoadUserProfile();

  const [budgetsLoading, setAreBudgetsLoading] = useState(true);
  const [budgetsError, setBudgetsError] = useState({
    state: false,
    message: 'Errore durante il caricamento dei tuoi budget.',
  });

  useEffect(() => {
    loadBudgets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadBudgets() {
    const externalCallResult: ExternalCallResult | string = await getSpendilowUserBudgets().finally(
      () => {
        setAreBudgetsLoading(false);
      },
    );

    if ((externalCallResult as ExternalCallResult).budgets) {
      dispatch(updateUserBudgets((externalCallResult as ExternalCallResult).budgets));
      dispatch(changeUserLoggedState(true));
    } else {
      setBudgetsError({
        state: true,
        message: externalCallResult as string,
      });
    }
  }

  return (
    <>
      <div className='min-h-screen static'>
        <LoaderComponent
          isLoading={budgetsLoading}
          message={'Caricamento dei tuoi budget in corso 💰'}
        ></LoaderComponent>

        {budgetsError.state ? (
          <>
            <ErrorScreenComponent message={budgetsError['message']}></ErrorScreenComponent>
            <Link to='/'>
              <button className='btn btn-accent font-primary bg-accent place-self-end fixed bottom-3 right-3 shadow'>
                Torna alla home
              </button>
            </Link>
          </>
        ) : (
          <>
            <UserBudgetsWidgets></UserBudgetsWidgets>
            <DataDisplayerComponent
              title='Elenco'
              subtitle='Ecco i budget, lo strumento con cui puoi fissare degli obiettivi finanziari 💸'
              mode='budgets'
              isLoading={budgetsLoading}
              error={budgetsError.state}
              errorMessage={budgetsError.message}
            ></DataDisplayerComponent>
          </>
        )}
      </div>
    </>
  );
}
