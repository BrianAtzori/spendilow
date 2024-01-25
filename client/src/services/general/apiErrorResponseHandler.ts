const apiErrorResponseHandler = function (errorCode: number, problem: string) {
    console.log(errorCode);
    alert(problem);
}

export {
    apiErrorResponseHandler,
}