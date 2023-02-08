import React, { createContext, useContext, useReducer } from "react";
//Provides the dataLayer
export const StateContext = createContext(null);
//Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//Pull information from data layer
export const useStateValue = () => useContext(StateContext);