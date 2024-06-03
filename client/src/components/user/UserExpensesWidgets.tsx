// ------ REACT ------
import React from 'react';

// ------ REDUX ------
import { useAppSelector } from '../../redux/hooks';
import { SpendilowTransaction, SpendilowUser } from '../../shared/interfaces';

export default function UserExpensesWidgets() {
  // ----- HOOKS ------
  const transactions: SpendilowTransaction[] = useAppSelector(
    (state) => state.userTransactions.transactions,
  );

  const currentSpendilowUser: SpendilowUser = useAppSelector((state) => state.userProfile.value);

  // ------ DATA HANDLING ------
  const currentDate = new Date();

  const userExpensesValuesGeneration = (mode: string) => {
    let calculatedValue: number = 0;

    if (!(transactions.length === 0)) {
      switch (mode) {
        case 'total': {
          calculatedValue = currentSpendilowUser.savings;
          for (let i = 0; i < transactions.length; i++) {
            switch (transactions[i].transaction_type) {
              case 'Income':
                calculatedValue += Number(transactions[i].amount);
                break;
              case 'Expense':
                calculatedValue -= Number(transactions[i].amount);
                break;
              case 'Budget':
                calculatedValue += Number(transactions[i].amount);
                break;
              default:
                break;
            }
          }
          break;
        }

        case 'incomes': {
          const filteredTransactions = transactions.filter(
            (singleTransaction) => singleTransaction.transaction_type === 'Income',
          );

          for (let i = 0; i < filteredTransactions.length; i++) {
            calculatedValue += Number(filteredTransactions[i].amount);
          }

          break;
        }

        case 'expenses': {
          const filteredTransactions = transactions.filter(
            (singleTransaction) => singleTransaction.transaction_type === 'Expense',
          );

          for (let i = 0; i < filteredTransactions.length; i++) {
            calculatedValue -= Number(filteredTransactions[i].amount);
          }

          break;
        }

        case 'budgets': {
          const filteredTransactions = transactions.filter(
            (singleTransaction) => singleTransaction.transaction_type === 'Budget',
          );

          for (let i = 0; i < filteredTransactions.length; i++) {
            calculatedValue += Number(filteredTransactions[i].amount);
          }

          break;
        }
      }

      return Number(calculatedValue).toFixed(2);
    } else {
      return 0;
    }
  };

  return (
    <>
      <div className='hero tablet:place-items-start'>
        <div className='hero-content flex-col gap-3 min-w-full'>
          <div className='text-left shadow card card-body bg-base-100 tablet:w-full'>
            <h1 className='text-5xl font-bold font-primary'>I tuoi movimenti</h1>
            <div className='font-body'>
              <p className=''>
                Qui potrai trovare il resoconto di tutte le tue entrate e le uscite, insieme ai tuoi
                budget 💰
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-3 justify-around w-full tablet:flex-wrap tablet:flex-row tablet:justify-between desktop:justify-start'>
            <div className='stats shadow font-heading tablet:w-5/12 tablet:max-w-xl overflow-hidden '>
              <div className='stat'>
                <div className='stat-figure text-secondary hidden desktop:block'>
                  <svg
                    className='w-6 h-6 text-accent dark:text-accent'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5 5c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1h1c.6 0 1-.4 1-1a1 1 0 1 1 2 0c0 .6.4 1 1 1a2 2 0 0 1 2 2v1c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V7c0-1.1.9-2 2-2ZM3 19v-7c0-.6.4-1 1-1h16c.6 0 1 .4 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6-6c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1ZM7 17a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Zm6 0c0-.6-.4-1-1-1a1 1 0 1 0 0 2c.6 0 1-.4 1-1Zm2 0a1 1 0 1 1 2 0c0 .6-.4 1-1 1a1 1 0 0 1-1-1Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='stat-title'>Oggi é il:</div>
                <div className='stat-value'>
                  {currentDate.getDate() +
                    '/' +
                    (currentDate.getMonth() + 1) +
                    '/' +
                    currentDate.getFullYear()}
                </div>
                <div className='stat-desc'>Tieni sempre d'occhio a che punto del mese sei!</div>
              </div>
            </div>
            {transactions.length === 0 ? (
              <div className='stats shadow font-heading tablet:w-5/12 tablet:max-w-xl'>
                <div className='stat'>
                  <div className='stat-figure text-secondary hidden desktop:block'>
                    <svg
                      className='w-6 h-6 text-accent dark:text-accent'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fillRule='evenodd'
                        d='M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='stat-title'>Movimento piú recente:</div>
                  <div className='stat-desc'>Inserisci una transazione per iniziare</div>
                </div>
              </div>
            ) : (
              <div className='stats shadow font-heading tablet:w-5/12 tablet:max-w-xl overflow-hidden'>
                <div className='stat'>
                  <div className='stat-figure text-secondary hidden desktop:block'>
                    <svg
                      className='w-6 h-6 text-accent dark:text-accent'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        fillRule='evenodd'
                        d='M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='stat-title'>Ultimo movimento:</div>
                  <div className='stat-value'>{transactions[0].amount}</div>
                  <div className='stat-desc'>{transactions[0].title}</div>
                </div>
              </div>
            )}
            <div className='stats shadow font-heading tablet:w-5/12  tablet:max-w-xl overflow-hidden'>
              <div className='stat'>
                <div className='stat-figure text-secondary hidden desktop:block'>
                  <svg
                    className='w-6 h-6 text-accent dark:text-accent'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m13.5 8.3 3.8-3.9a1.5 1.5 0 0 1 2.1 0l.2.2a1.5 1.5 0 0 1 0 2l-3.9 4a4 4 0 0 0-2.2-2.3Zm0 0a4 4 0 0 1 2.2 2.2L19.4 7a9 9 0 0 1 0 10.2l-3.7-3.6m-2.2-5.2L17 4.6a9 9 0 0 0-10 0l3.6 3.7a4 4 0 0 0-2.2 2.2L4.6 7a9 9 0 0 0 0 10.2l3.7-3.6a4 4 0 0 0 2.2 2.2L7 19.4a9 9 0 0 0 10.2 0l-3.6-3.7a4 4 0 0 0 2.2-2.2m0 0 3.9 3.8a1.5 1.5 0 0 1 0 2.1l-.2.2a1.5 1.5 0 0 1-2 0l-4-3.9a4 4 0 0 0 2.3-2.2ZM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm-7.7 1.5-3.9 3.8a1.5 1.5 0 0 0 0 2.1l.2.2a1.5 1.5 0 0 0 2 0l4-3.9a4 4 0 0 1-2.3-2.2Zm2.2-5.2L6.7 4.4a1.5 1.5 0 0 0-2.1 0l-.2.2a1.5 1.5 0 0 0 0 2l3.9 4a4 4 0 0 1 2.2-2.3Z'
                    />
                  </svg>
                </div>
                <div className='stat-title'>I tuoi risparmi totali:</div>
                <div className='stat-value'>{userExpensesValuesGeneration('total')}</div>
                <div className='stat-desc'>Risparmi iniziali + Entrate + Budget - Spese 💰</div>
              </div>
            </div>
            <div className='stats shadow font-heading tablet:w-5/12 tablet:max-w-xl overflow-hidden'>
              <div className='stat'>
                <div className='stat-figure text-secondary hidden desktop:block'>
                  <svg
                    className='w-6 h-6 text-accent dark:text-accent'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4.2a1 1 0 1 0-2 0V11H7.8a1 1 0 1 0 0 2H11v3.2a1 1 0 1 0 2 0V13h3.2a1 1 0 1 0 0-2H13V7.8Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='stat-title'>Entrate totali:</div>
                <div className='stat-value text-success'>
                  {userExpensesValuesGeneration('incomes')}
                </div>
                <div className='stat-desc'>Tutti i movimenti inseriti come "Entrate" ➕</div>
              </div>
            </div>
            <div className='stats shadow font-heading tablet:w-5/12 tablet:max-w-xl overflow-hidden'>
              <div className='stat'>
                <div className='stat-figure text-secondary hidden desktop:block'>
                  <svg
                    className='w-6 h-6 text-accent dark:text-accent'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M13.5 2a7 7 0 0 0-.5 0 1 1 0 0 0-1 1v8c0 .6.4 1 1 1h8c.5 0 1-.4 1-1v-.5A8.5 8.5 0 0 0 13.5 2Z' />
                    <path d='M11 6a1 1 0 0 0-1-1 8.5 8.5 0 1 0 9 9 1 1 0 0 0-1-1h-7V6Z' />
                  </svg>
                </div>
                <div className='stat-title'>Budget totali:</div>
                <div className='stat-value text-info'>
                  {userExpensesValuesGeneration('budgets')}
                </div>
                <div className='stat-desc'>Il totale che hai destinato ai tuoi budget 🐽</div>
              </div>
            </div>
            <div className='stats shadow font-heading tablet:w-5/12 tablet:max-w-xl overflow-hidden'>
              <div className='stat'>
                <div className='stat-figure text-secondary hidden desktop:block'>
                  <svg
                    className='w-6 h-6 text-accent dark:text-accent'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fillRule='evenodd'
                      d='M9 14.3H5a2 2 0 0 1-1.6-.9 2 2 0 0 1-.3-1.8l2.4-7.2C5.8 3.5 6 3 7.4 3c2 0 4.2.7 6.1 1.3l1.4.4v9.8a32 32 0 0 0-4.2 5.5c-.1.4-.5.7-.9.9a1.7 1.7 0 0 1-2.1-.7c-.2-.4-.3-.8-.3-1.3L9 14.3Zm10.8-.3H17V6a2 2 0 1 1 4 0v6.8c0 .7-.5 1.2-1.2 1.2Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='stat-title'>Uscite totali:</div>
                <div className='stat-value text-error'>
                  {userExpensesValuesGeneration('expenses')}
                </div>
                <div className='stat-desc'>Un valore da non sottovalutare mai 🚫</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
