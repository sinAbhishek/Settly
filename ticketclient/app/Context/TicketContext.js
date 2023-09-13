"use client";
import { createContext } from "react";
import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { useContext, useEffect } from "react";
import axios from "axios";

const INITIAL_STATE = { tickets: [] };

export const TicketContext = createContext(INITIAL_STATE);
const TicketReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        tickets: action.payload,
      };
    case "UPDATE":
      const updated = [...state.tickets, action.payload];
      console.log(updated);
      return {
        ...state,
        tickets: updated,
      };

    default:
      return state;
  }
};
export const TicketContextProvider = ({ children }) => {
  const [state, Tikdispatch] = useReducer(TicketReducer, INITIAL_STATE);

  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        Tikdispatch,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
