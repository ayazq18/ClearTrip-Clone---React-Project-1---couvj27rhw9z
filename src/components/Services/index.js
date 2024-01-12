import { Base_URL } from "../Constants";
import { Project_ID } from "../Constants";

export const fetchOffer = async ()=>{
    try{
    const res = await fetch(`${Base_URL}/offers`,{
        method : "GET",
          headers : {
            projectID : Project_ID,
            "Content-Type": "application/json",
          }
    })
        const result = res.json()
        return result;
    }catch(error){
        return error
    }
}

export const fetchFlights = async ()=>{
      try{
        const response = await fetch (`${Base_URL}/flight?search={"source":"","destination":""}&day=Wed`, {
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