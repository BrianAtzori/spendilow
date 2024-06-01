import React from 'react';

//Similar to the error component, displayed inside the DataDisplayerComponent when there are no results

export default function NoResultsComponent() {
  return (
    <div className='hero mx-auto min-h-full'>
      <div className='hero-content'>
        <div className='card'>
          <div className='card-body'>
            <div className='alert bg-transparent border-0'>
              <svg
                className='w-20 h-20 tablet:w-10 tablet:h-10 text-neutral dark:text-accent'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  fillRule='evenodd'
                  d='M9 7V2.2a2 2 0 0 0-.5.4l-4 3.9a2 2 0 0 0-.3.5H9Zm2 0V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm.5 5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm0 5c.5 0 1 0 1.3-.3l2 2a1 1 0 0 0 1.4-1.4l-1.8-1.8c.4-.6.6-1.3.6-2a3.5 3.5 0 1 0-3.5 3.5Z'
                  clipRule='evenodd'
                />
              </svg>
              <span className='font-heading'>Nessun risultato trovato</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
