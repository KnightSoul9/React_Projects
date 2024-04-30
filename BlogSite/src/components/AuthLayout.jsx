//this file is mainly used to protect the pages and routes
import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
//we take the authentication provided by the user is always true 
export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false
//provided the condition on the top we make the logic here 
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, 
    // describing the parameters on which the dependency array will change 
    // if the authentication staus is changed or user get redirected from any other page or 
    // the user have send any authentication request 
    [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}

