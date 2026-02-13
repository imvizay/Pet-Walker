import { useState,useEffect } from "react";

export const useDebounce = (value,delay=2000) => {

    let [debounce,setDebounce] = useState(value)

    useEffect(()=>{
         const timer = setTimeout(() => {
                setDebounce(value)
            }, delay);

         return ()=>clearTimeout(timer)
    },[value,delay])
    
    return debounce
}