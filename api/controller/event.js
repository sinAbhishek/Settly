import Event from "../model/event.js";

export const createEvent = async (req, res) => {
  try {
    const newevent = new Event(req.body);
    console.log(newevent);
    const savedevent = await newevent.save();
    res.status(200).json(savedevent);
  } catch (err) {
    next(err);
  }
};

export const getevents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    next(err);
  }
};
