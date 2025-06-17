
import React, { useEffect, useState } from "react"
import Loader from "./common/Loader"


interface WrapperProps{
    children:React.ReactNode
}

function ClientOnly({children}:WrapperProps) {
    const [isClient,setIsClient]=useState(false)

    useEffect(()=>{
        setTimeout(() => {
            setIsClient(true)
        }, 2000);
    },[])

    if(!isClient) return <>
  <div className="absolute flex h-[70vh] justify-center items-center w-full bg-black/30 xl:h-[100vh] md:h-3/4 sm:h-full">
      
        <Loader/>
 
  </div>
    </>
  return (
    <div>
      {children}
    </div>
  )
}

export default ClientOnly
