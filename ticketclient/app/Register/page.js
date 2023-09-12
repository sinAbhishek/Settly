"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { useRouter } from "next/navigation";
const Register = () => {
  const [active, setActive] = useState(false);
  const router = useRouter();
  const [Loading, setloading] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);
  const [registerDetails, setregisterDetails] = useState({
    name: "",
    email: "",
    password: "",
  });
  const URL = "http://localhost:4000/api";
  const handleChange = (e) => {
    setregisterDetails((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  const register = async () => {
    if (
      registerDetails.email.length == 0 ||
      registerDetails.name.length == 0 ||
      registerDetails.password.length == 0
    ) {
      setActive(true);
    } else {
      setloading(true);
      const res = await axios.post(`${URL}/auth/register`, registerDetails);
      setloading(false);
      console.log(res.data);
      router.push("/login");
    }
  };
  return (
    <>
      <div className="bgcover"></div>
      <div className="login-container w-screen h-screen flex justify-center items-center">
        <div className="loginWrapper flex flex-col justify-center items-center bg-gray-700 p-12">
          <h1 className="log-h1  font-bold text-white text-3xl mb-4">
            REGISTER
          </h1>
          <div className="login-form flex flex-col">
            <input
              className="reg-input border border-slate-500 px-4 py-2 rounded-md "
              placeholder="Name"
              type="text"
              id="name"
              onChange={handleChange}
            />
            {active && registerDetails.name.length == 0 && (
              <label>Username cannot be empty</label>
            )}
            <input
              className="reg-input border border-slate-500 px-4 py-2 rounded-md my-4  "
              placeholder="Email"
              type="text"
              id="email"
              onChange={handleChange}
            />
            {active && registerDetails.email.length == 0 && (
              <label>Firstname cannot be empty</label>
            )}
            <input
              className="reg-input border border-slate-500 px-4 py-2 rounded-md "
              placeholder="Password"
              type="password"
              id="password"
              onChange={handleChange}
            />
            {active && registerDetails.password.length == 0 && (
              <label>Lastname cannot be empty</label>
            )}

            <button
              onClick={register}
              className="loginBtn bg-lime-300 px-4 py-2 font-medium mt-4"
            >
              REGISTER
            </button>
            <div className="scalelod flex justify-center mt-2">
              <ScaleLoader
                color={"white"}
                loading={Loading}
                size={17}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
            <h1 className=" text-red-100 mt-4">
              Already registered?{" "}
              <Link
                href={{
                  pathname: "/login",
                }}
              >
                <span className=" underline">Login here</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
