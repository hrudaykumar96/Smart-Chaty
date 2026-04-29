import { useEffect } from "react";
import LoginForm from "../forms/LoginForm";

const Login = () => {
  useEffect(() => {
    document.title = "Login - Smart Chaty";
  }, []);

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
