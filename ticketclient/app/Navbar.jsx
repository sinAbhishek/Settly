import React, { useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const router = useRouter();
  const [tickets, settickets] = useState([]);
  const [open, setopen] = useState(false);
  const URL = process.env.NEXT_PUBLIC_APP_Url;
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/auth/${user._id}`);
      settickets(res.data.tickets);
    };
    user && call();
  }, []);
  return (
    <div className=" h-24 w-screen bg-slate-100 border border-b-stone-900 flex justify-between items-center">
      <h1 className=" ml-4">Home</h1>
      <div className=" mr-4">
        {" "}
        {user ? (
          <div className="">
            {" "}
            <button
              onClick={() => setopen(!open)}
              className=" bg-red-400 px-4 py-1 rounded-md text-white font-medium"
            >
              My Tickets
            </button>
            <button
              onClick={() => dispatch({ type: "LOGOUT" })}
              className=" bg-red-800 px-3 py-1 ml-2 rounded-md text-white font-medium"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className=" bg-red-500 px-4 py-1 text-white font-medium"
          >
            Login
          </button>
        )}
      </div>
      <div
        className={
          open
            ? `${styles.show}  w-72 h-screen bg-orange-100 right-0 top-0 bottom-0 z-20 fixed overflow-auto pt-8 border border-black`
            : ` ${styles.hide} w-72 h-screen bg-stone-700 right-0 top-0 bottom-0 z-20 fixed overflow-auto`
        }
      >
        <div className="bg-black w-8 h-8 rounded-full absolute top-0 left-0 hover:cursor-pointer flex justify-center items-center ">
          {" "}
          <span onClick={() => setopen(!open)} className=" text-white   ">
            X
          </span>
        </div>

        {tickets[0] ? (
          tickets.map((c, i) => (
            <div key={i} className=" bg-zinc-200">
              <div className=" flex items-center">
                <img className=" w-12 h-12" src={c.image} alt="" />
                <div className="">
                  {" "}
                  <h1 className="text-black text-xs ml-2 font-medium">
                    Price: {c.Price}
                  </h1>
                  <h1 className="text-black text-xs ml-2 font-medium">
                    Number of tickets: {c.ticket}
                  </h1>
                </div>
              </div>
              <h1 className=" font-semibold text-black">{c.eventtitle}</h1>
            </div>
          ))
        ) : (
          <div className=" w-full h-screen text-black flex items-center justify-center">
            {" "}
            No tickets booked yet
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
