import { useEffect, useRef, useState } from "react"

export const useOutsideAlerter1 = (initialValue) =>{
    const ref1 = useRef()
    const [click,setClick] = useState(initialValue)
    const handleClickOutside= (event)=>{
       if(ref1.current && !ref1.current.contains(event.target)){
        setClick(false)
       }
    }
    useEffect(() => {
        document.addEventListener('click',handleClickOutside,true)
        return () => {
            document.removeEventListener('click',handleClickOutside,true)
        }
    }, [ref1])
    

    return({click,setClick,ref1})
}

export const useOutsideAlerter2 = (initialValue) =>{
    const ref2 = useRef()
    const [userDropdownStatus,setUserDropdownStatus] = useState(initialValue)
    const handleClickOutside= (event)=>{
       if(ref2.current && !ref2.current.contains(event.target)){
        setUserDropdownStatus(false)
       }
    }
    useEffect(() => {
        document.addEventListener('click',handleClickOutside,true)
        return () => {
            document.removeEventListener('click',handleClickOutside,true)
        }
    }, [ref2])
    

    return({userDropdownStatus,setUserDropdownStatus,ref2})
}

export const useOutsideAlerter3 = (initialValue) =>{
    const ref3 = useRef()
    const [adminDropdownStatus,setAdminDropdownStatus] = useState(initialValue)
    const handleClickOutside= (event)=>{
       if(ref3.current && !ref3.current.contains(event.target)){
        setAdminDropdownStatus(false)
       }
    }
    useEffect(() => {
        document.addEventListener('click',handleClickOutside,true)
        return () => {
            document.removeEventListener('click',handleClickOutside,true)
        }
    }, [ref3])
    

    return({adminDropdownStatus,setAdminDropdownStatus,ref3})
}

