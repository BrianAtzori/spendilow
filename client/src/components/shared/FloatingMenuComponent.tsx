import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { setTransactionModalShowing } from '../../redux/reducers/interactions/transactionModalSlice';

export default function FloatingMenuComponent() {
  const dispatch = useAppDispatch();

  return (
    <>
      <ul className='menu bg-accent rounded-box max-w-min place-self-end fixed bottom-3 right-3 z-10 shadow'>
        <li>
          <Link to='/user/dashboard'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 text-neutral dark:text-neutral'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
              />
            </svg>
          </Link>
        </li>
        <li>
          <button onClick={() => dispatch(setTransactionModalShowing(true))}>
            <svg
              className='w-5 h-5 text-neutral dark:text-base'
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
          </button>
        </li>
        <li>
          <Link to='/user/settings'>
            <svg
              className='w-5 h-5 text-neutral dark:text-neutral'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                fillRule='evenodd'
                d='M17 10v1.1l1 .5.8-.8 1.4 1.4-.8.8.5 1H21v2h-1.1l-.5 1 .8.8-1.4 1.4-.8-.8a4 4 0 0 1-1 .5V20h-2v-1.1a4 4 0 0 1-1-.5l-.8.8-1.4-1.4.8-.8a4 4 0 0 1-.5-1H11v-2h1.1l.5-1-.8-.8 1.4-1.4.8.8a4 4 0 0 1 1-.5V10h2Zm.4 3.6c.4.4.6.8.6 1.4a2 2 0 0 1-3.4 1.4A2 2 0 0 1 16 13c.5 0 1 .2 1.4.6ZM5 8a4 4 0 1 1 8 .7 7 7 0 0 0-3.3 3.2A4 4 0 0 1 5 8Zm4.3 5H7a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h6.1a7 7 0 0 1-1.8-7Z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </li>
      </ul>
    </>
  );
}
