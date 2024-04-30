import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
//calling login as authlogin to avoid the ambiguity 
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
//here we will use the hook form to create a login form 
import {useForm} from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    //these are the methods that will be called when the login is done by user 
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        //here we are checking for the data and we get it in form of session 
        try {
            const session = await authService.login(data)
            //if session is present then user is loged in  
            if (session) {
                const userData = await authService.getCurrentUser()
                //Now if the session is found then get the current user and send its data to the root using the navigate 
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        {/* when we will submit the form then handleSubmit event will be triggered and we do not have to handle the state of the submitted parameters it will autimatically handle the state of the input variables  */}
        <form onSubmit={handleSubmit(login)} className='mt-8'>

            <div className='space-y-5'>
                {/* now we are taking the parameters by passing the props in the Input component */}
                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                //here we are using the register operator to spread the input we have taken 
                {...register("email", {
                    required: true,
                    validate: {
                        //for the va;aidation of the email we  use this regular expression 
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                {/* Here we are valiating the password now and we are doing the same operations we performed  */}
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                // spreading up the values we are taking as the input
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login