// import React from "react";
// import MultiStepForm from "./MultiStepForm";

import { useLoaderData } from "react-router-dom";
import MultiStepForm from "./MultiSetpForm";

// import MultiStepForm from "./MultiSetpForm";

const Trying = () => {
  
  const userData = useLoaderData();
  console.log("userData",userData) 
  console.log("add courser")
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <MultiStepForm application={userData} />
    </div>
  );
};

export default Trying;