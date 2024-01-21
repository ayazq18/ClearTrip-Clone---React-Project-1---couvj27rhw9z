import { Base_URL, Project_ID, appType } from "../Constants";
import React, { createContext, useContext, useState } from 'react';

export const MyContext = createContext();

    // --------------OfferApi------------------

    export const fetchOffer = async ()=>{
        try{
        const res = await fetch(`${Base_URL}/offers`,{
            method : "GET",
              headers : {
                projectID : Project_ID,
                "Content-Type": "application/json",
              }
        })
            const result = await res.json()
            return result;
        }catch(error){
            return error
        }
    }

    // --------------OfferApi------------------


    // --------------FlightsApi------------------


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

    // --------------FlightsApi------------------



    // ----------------------Login-------------------------