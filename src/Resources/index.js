import { Base_URL, Project_ID, appType } from "../components/Constants";
import React, { createContext, useContext, useState } from 'react';

export const MyContext = createContext();

  export const fetchFlights = async ()=>{
      try{
        const response = await fetch (`${Base_URL}/airport?search={"city":${flight}}`, {
          method : "GET",
          headers : {
            projectID : Project_ID,
            "Content-Type": "application/json",
          }
        })
        const result = await response.json()
        return result;
      }catch(error){
        return(error);
      }
    }

    