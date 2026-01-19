import React from "react";
interface FormErrorMessageInterface {
  message: string;
}

function FormErrorMessage({ message = "" }: FormErrorMessageInterface) {
  if (message)
    return (
      <div>
        <p className='text-red-500 text-[10px] font-bold'>
          {" "}
          {message.replaceAll("_", " ")}
        </p>
      </div>
    );
  else null;
}

export default FormErrorMessage;
