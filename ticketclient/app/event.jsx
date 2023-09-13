import React from "react";
import Link from "next/link";
import { AuthContext } from "./Context/AuthContext";
import { useContext } from "react";
const Event = ({ event }) => {
  //   console.log(event);
  const { user } = useContext(AuthContext);
  return (
    <div className=" my-2">
      <img className="w-screen h-80 bg-cover" src={event.image} alt="" />

      <div className=" w-screen h-max bg-gray-900 flex items-center justify-between py-8 pr-4">
        <h1 className="text-slate-100 font-bold text-lg ml-2">
          {event.eventtitle.substring(0, 70)}...
        </h1>
        <Link
          href={{
            pathname: user ? `/${event.eventtitle}` : "/login",
            query: {
              search: `${event.eventtitle}`,
            },
          }}
        >
          <button className=" bg-pink-600 w-36 text-white font-medium px-4 py-1 rounded-md mr-2">
            Get Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Event;
