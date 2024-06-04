interface errorProps {
  message: string;
}

export default function ErrorComponent({ message }: errorProps) {
  return (
    <div role='alert' className='alert alert-error font-heading text-neutral'>
      <span>✋🏻 {message}</span>
    </div>
  );
}
