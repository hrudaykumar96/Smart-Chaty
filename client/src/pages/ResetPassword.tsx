import { useEffect } from "react";
import PasswordResetForm from "../forms/PasswordResetForm";

const ResetPassword = () => {
    
  useEffect(() => {
    document.title = "Reset Password - Smart Chaty";
  }, []);

  return (
    <div>
      <PasswordResetForm />
    </div>
  );
};

export default ResetPassword;
