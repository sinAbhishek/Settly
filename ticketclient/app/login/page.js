"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import ScaleLoader from "react-spinners/BeatLoader";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const URL = process.env.NEXT_PUBLIC_APP_Url;
const Login = () => {
  const router = useRouter();
  const [Loading, setloading] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);
  const [loginDetails, setLoginDetails] = useState({
    name: undefined,
    password: undefined,
  });
  const handleChange = (e) => {
    setLoginDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      setloading(true);
      const res = await axios.post(`${URL}/auth/login`, loginDetails);
      setloading(false);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      router.push("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      console.log(err);
      setloading(false);
      toast.error(err.response.data.message, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log("pass is wrong");
    }
  };
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <div className="login-container w-screen h-screen flex justify-center items-center">
        <div className="login1Wrapper flex flex-col justify-center items-center bg-gray-700 p-12">
          <h1 className="log-h1 font-bold text-white text-3xl mb-4">LOGIN</h1>
          <div className="login-form flex flex-col ">
            <input
              className="login-input border border-slate-500 px-4 py-2 rounded-md "
              placeholder="Enter username"
              type="text"
              id="name"
              onChange={handleChange}
            />
            <input
              className="login-input border border-slate-500 px-4 py-2 my-4 rounded-md"
              placeholder="Enter password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            <button
              className="loginBtn bg-lime-300 px-4 py-2 font-medium"
              onClick={handleClick}
            >
              LOGIN
            </button>
            {Loading && (
              <div className="scalelod flex justify-center mt-4">
                <ScaleLoader
                  color={"white"}
                  loading={Loading}
                  size={17}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )}
          </div>
          <h1 className=" text-red-200 mt-3">
            New user?{" "}
            <Link
              href={{
                pathname: "/Register",
              }}
            >
              <span className=" underline">Register here</span>
            </Link>
          </h1>
          <Link
            href={{
              pathname: "/",
            }}
          >
            <span className=" underline text-amber-300 font-medium mt-2">
              Home
            </span>
          </Link>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

export default Login;
