"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import UploadIcon from "@mui/icons-material/Upload";
import ScaleLoader from "react-spinners/ScaleLoader";
import axios from "axios";
import Button from "@mui/material/Button";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DateTimePicker from "react-datetime-picker";
import Event from "./event";
import Navbar from "./Navbar";
import { useRouter } from "next/navigation";
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
export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, onChange] = useState(new Date());
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [file, setfile] = useState({ name: "Upload image" });
  const [image, setimage] = useState("");
  const [events, setevents] = useState([]);
  const [Loading, setloading] = useState(true);
  const URL = process.env.NEXT_PUBLIC_APP_Url;
  const [data, setdata] = useState({
    eventtitle: "",
    eventdetail: "",
    image: "",
    datetime: "",
  });
  const cloud_name = "dxz1nwfam";
  const preset_key = "dfpytcaw";
  const handlechange = (e) => {
    setdata((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const upload = async () => {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("upload_preset", preset_key);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formdata
    );
    console.log(res.data);
    setimage(res.data.secure_url);
  };
  useEffect(() => {
    console.log(URL);
    const call = async () => {
      const res = await axios.get(`${URL}/getevents`);
      setevents(res.data);
      setloading(false);
    };
    call();
  }, []);
  useEffect(() => {
    const submit = async () => {
      const final = { ...data, image: image, datetime: value };

      const res = await axios.post(`${URL}/createevent`, final);
      handleClose();
      setevents((prev) => [...prev, final]);
    };
    {
      image && submit();
    }
  }, [image]);

  return (
    <>
      <Navbar />
      {!Loading ? (
        <div className=" flex float-right my-2 mr-4">
          {" "}
          <button
            onClick={handleOpen}
            className=" bg-black text-white font-medium rounded-md px-4 py-1"
          >
            + Create Events
          </button>
        </div>
      ) : (
        <div className="scalelod bg-black items-center flex justify-center mt-2 h-screen">
          <ScaleLoader
            color={"white"}
            loading={Loading}
            size={17}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <div className=" mt-4">
        {events[0] && events.map((c, i) => <Event key={i} event={c} />)}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className=" ">
            <input
              onChange={handlechange}
              className=" px-2 py-4 h-4 outline-none border border-zinc-500 text-slate-800 rounded-md mb-2"
              id="eventtitle"
              placeholder="Title"
              type="text"
            />
            <input
              onChange={handlechange}
              className=" px-2 py-4 h-4 outline-none border border-zinc-500 text-slate-800 rounded-md mb-2"
              id="eventdetail"
              placeholder="Event Details"
              type="text"
            />
            <input
              onChange={(e) => setfile(e.target.files[0])}
              className="hidden"
              id="img"
              type="file"
            />
            <div className="">
              <label
                className=" bg-teal-400 px-2  py-2 flex items-center w-1/2 my-2"
                htmlFor="img"
              >
                <UploadIcon />
                {file.name}
              </label>
            </div>

            <DateTimePicker onChange={onChange} value={value} />
          </div>
          <div className=" flex justify-center mt-4">
            <button
              className=" bg-black text-white font-medium px-4 py-2 rounded-md"
              onClick={upload}
            >
              Submit
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
