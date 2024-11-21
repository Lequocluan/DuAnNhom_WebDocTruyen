const ErrorMessage = ({  errorMessage }) => {
    return (
      <>
        {errorMessage && <div className="text-red-500 text-xl">{errorMessage}</div>}
      </>
    );
  };
  
  export default ErrorMessage;
  