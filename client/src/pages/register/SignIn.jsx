import React, { useRef, useState } from "react";
import { Alert, TextField, Button, CircularProgress } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../services/GlobalApi";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastSuccess } from "../../components/Toast";

function SignIn() {
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [inputData, setInputData] = useState({});
  const showPasswordElement = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const user = await signIn(inputData);
      console.log(user.data);
      dispatch(signInSuccess(user.data));
      navigate("/");
      ToastSuccess("Sign in successful!"); // use to generate a successful toast when sign in
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      dispatch(signInFailure(errorMessage));
    }
  };
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };
  return (
    <div className="flex items-center justify-center min-h-screen max-w-lg mx-auto p-7">
      <div className="flex flex-col gap-3 border border-1 rounded-2xl w-full py-7 px-7 shadow-xl border-gray-400">
        <h1 className="text-center text-3xl font-bold">Login</h1>
        <p className="text-md text-gray-600">
          Sign in and let's get your garden blooming!
        </p>
        <form className="flex flex-col gap-3 my-2" onSubmit={handleSubmit}>
          <div className="relative">
            <TextField
              type="email"
              variant="standard"
              label="Your Email"
              id="email"
              onChange={handleChange}
              className="w-full text-white"
            />
            <MdEmail className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl" />
          </div>
          <div className="relative">
            <TextField
              type="password"
              variant="standard"
              label="Your Password"
              id="password"
              ref={showPasswordElement}
              onChange={handleChange}
              className="w-full text-white"
            />
            {showPassword ? (
              <GoEye
                className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl cursor-pointer"
                onClick={() => {
                  setShowPassword(false);
                  showPasswordElement.current.type = "password";
                }}
              />
            ) : (
              <GoEyeClosed
                className="absolute top-1/2 -translate-y-1/2 right-4 z-0 text-xl cursor-pointer"
                onClick={() => {
                  setShowPassword(true);
                  showPasswordElement.current.type = "text";
                }}
              />
            )}
          </div>

          <button
            type="button"
            className="text-center flex items-center justify-center w-full py-2 px-1 text-md text-white font-md bg-green-900 rounded-md hover:bg-green-950 duration-105 transition-all hover:text-yellow-400"
            disabled={loading}
          >
            {loading ? <CircularProgress size="20px" /> : "Sign in"}
          </button>
          {error && <Alert severity="error">{error}</Alert>}
        </form>
        <span className="text-gray-400">Don't have an account?</span>
        <Link to={"/sign-up"}>
          <span className="text-green-800 hover:underline ml-2 font-semibold">
            Create new Account
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
