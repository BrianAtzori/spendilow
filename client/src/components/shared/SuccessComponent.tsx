interface errorProps {
  message: string;
}

export default function SuccessComponent({ message }: errorProps) {
  return (
    <div role='alert' className='alert alert-success font-heading text-neutral'>
      <span>👌🏻 {message}</span>
    </div>
  );
}
