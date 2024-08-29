import React, { useContext, useState } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signinWithGmail, logIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");

  // redirecting to home page or specifig page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    setErrorMessage("");
    logIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        alert("Login Success");
        navigate("/menu", { replace: true });
        closeForm();
      })
      .catch((error) => {
        const errorMassege = error.message;
        setErrorMessage("Provide a correct email and password!");
      });
  };
  //google login
  const handLogin = () => {
    signinWithGmail()
      .then((result) => {
        const user = result.user;
        alert("Login Success");
      })
      .catch((error) => {
        const errorMessage = error.message;
      });
  };

  return (    
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form
            className="card-body"
            id="my_form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Login please!</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                {...register("email")}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password")}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            {errorMessage ? (
              <p className="text-red text-sm italic">{errorMessage}</p>
            ) : (
              ""
            )}
            <div className="form-control mt-6">
              <button className="btn bg-green text-white">Login</button>
            </div>
            <p className="text-center mt-4">
              Donot have an account?{" "}
              <Link to="/signup" className="text-red underline">
                SignUp Now
              </Link>
            </p>
          </form>
          <div className="flex justify-center space-x-3 my-6">
            <button className="btn btn-circle" onClick={handLogin}>
              <FaGoogle />
            </button>
            <button className="btn btn-circle">
              <FaFacebookF />
            </button>
            <button className="btn btn-circle">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
