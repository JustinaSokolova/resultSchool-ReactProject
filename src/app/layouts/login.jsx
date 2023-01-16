import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  const { type } = useParams;
  const [formType, setFormType] = useState(type === "register" ? type : "login");

  const toggleFormType = () => {
    setFormType(prevState => prevState === "register" ? "login" : "register");
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column col-md-4 shadow p-4">
        {formType === "register"
          ? <><h4 className="align-self-center mb-4">Registration</h4>
            <RegisterForm />
            <p className="align-self-center mt-4">Do you already have an account?&nbsp;
              <a className="text-reset" role="button" onClick={toggleFormType}>Sign In</a> </p>
          </>
          : <><h4 className="align-self-center mb-4">Login</h4>
            <LoginForm />
            <p className="align-self-center mt-4">Don&apos;t you have an account?&nbsp;
              <a className="text-reset" role="button" onClick={toggleFormType}>Sign Up</a> </p>
          </>}
      </div>
    </div>
  );
};

export default Login;
