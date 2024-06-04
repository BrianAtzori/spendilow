import spendilowLogo from '../../assets/logo/spendilow-logo-svg.svg';
interface loaderProps {
  isLoading: boolean;
  message: string;
}

export default function LoaderComponent({ isLoading, message }: loaderProps) {
  return (
    <>
      {!isLoading || (
        <>
          <div className='hero min-h-screen'>
            <div className='hero-content'>
              <div className='card'>
                <div className='card-body max-w-sm shadow-2xl bg-base-100 rounded-lg'>
                  <div className='mx-auto flex flex-col justify-around'>
                    <img src={spendilowLogo} className='self-center'></img>
                    <span className='loading loading-bars loading-lg text-primary self-center'></span>
                    <p className='font-heading text-neutral text-center'>{message}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
