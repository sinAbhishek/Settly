import React from "react";
import Link from "next/link";
const Event = ({ event }) => {
  //   console.log(event);
  return (
    <div>
      <img className="w-screen h-80 bg-cover" src={event.image} alt="" />

      <div className=" w-screen h-12 bg-gray-900 flex items-center justify-between">
        <h1 className="text-slate-100 font-bold text-lg">{event.eventtitle}</h1>
        <Link
          href={{
            pathname: `/${event.eventtitle}`,
            query: {
              search: `${event.eventtitle}`,
            },
          }}
        >
          <button className=" bg-pink-600 text-white font-medium px-4 py-1 rounded-md">
            Get Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Event;
