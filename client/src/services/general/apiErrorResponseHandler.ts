const apiErrorResponseHandler = (errorCode: number, problem: string): string => {
  return `Non siamo riusciti a completare l'operazione, errore #${errorCode.toString()} - ${problem}`;
};

export { apiErrorResponseHandler };
