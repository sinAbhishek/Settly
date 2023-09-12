"use client";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Navbar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Page = ({ searchParams }) => {
  const [date, setdate] = useState("");
  const [data, setdata] = useState([]);
  const [ticket, setticket] = useState(1);
  const [open, setOpen] = useState(false);
  const [number, setnumber] = useState([1, 2, 3, 4, 5, 6]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useContext(AuthContext);
  const URL = process.env.NEXT_PUBLIC_APP_Url;
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/getevents`);
      setdata(res.data.filter((c) => c.eventtitle === searchParams.search));
    };
    call();
  }, []);
  useEffect(() => {
    const call = () => {
      const date = new Date(data[0].datetime);

      setdate(date.toLocaleString());
    };
    data[0] && call();
  }, [data]);
  const select = (c) => {
    setticket(c);
  };
  const submit = async () => {
    const tickets = { ...data[0], Price: ticket * 500, ticket: ticket };
    const res = await axios.put(`${URL}/auth/${user._id}`, tickets);
    handleClose();
  };
  return (
    <>
      <Navbar />

      <div className=" w-screen flex justify-center mt-4">
        {data[0] && (
          <div className=" w-4/5 ">
            <div className=" flex-col flex md:flex-row md:h-64 w-full  ">
              <img
                className=" w-full md:w-96 h-64 md:h-full "
                src={data[0].image}
                alt=""
              />
              <div className=" flex flex-col items-center justify-center">
                <h1 className=" text-2xl font-bold">{data[0].eventtitle}</h1>
                {date && <h1>Date&Time : {date}</h1>}
                <button
                  onClick={handleOpen}
                  className=" bg-teal-500 px-4 py-1 rounded-md mt-4 text-slate-200 font-semibold"
                >
                  Book Tickets
                </button>
              </div>
            </div>
            <div className="">
              <h1 className=" font-bold text-slate-900 text-xl">
                About this event
              </h1>
              <h1 className=" font-medium ">{data[0].eventdetail}</h1>
            </div>
          </div>
        )}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div className="">
              <h1 className=" text-base font-medium">
                Price per ticket : Rs {500 * ticket}
              </h1>
              <h1 className=" text-base font-medium mt-4">
                Select number of tickets :
              </h1>
              <div className=" flex mb-2 ">
                {number.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => select(c)}
                    style={{ backgroundColor: ticket === c ? "red" : "black" }}
                    className="rounded-full w-6 h-6  text-white flex justify-center items-center hover:cursor-pointer"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className=" flex justify-center">
                <button
                  onClick={submit}
                  className=" bg-black text-white px-4 py-1 rounded-md hover:bg-red-400 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default Page;
