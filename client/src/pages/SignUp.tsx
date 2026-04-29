import { useEffect } from "react";
import SignUpForm from "../forms/SignUpForm";

const SignUp = () => {

  useEffect(() => {
    document.title = "Sign Up - Smart Chaty";
  },[]);
  
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

export default SignUp;
