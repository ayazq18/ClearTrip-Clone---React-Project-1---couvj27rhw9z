import React, { createContext, useContext, useState } from 'react'
const MyContext=createContext();
export function useAuthContext(){
    return useContext(MyContext);
}
export default function ContextAllDataProvider({children}) {
    const [all,setall]=useState({});
    const [paymnentdone, setpaymentdone] = useState(false)
    const [flightpaymnentdone, setflightpaymentdone] = useState(false)
  return (
  <MyContext.Provider value={{all, setall, paymnentdone, setpaymentdone, flightpaymnentdone, setflightpaymentdone}}>
    {children}
  </MyContext.Provider>
  )
}