import React, { useState , useContext} from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "../config/axios";
import {UserContext} from"../context/user.context";

const Login = ()=>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    function submitHandler(e) { 

        e.preventDefault()

        axios.post('/users/login', {
            email,
            password
        }).then((res) =>{
            console.log(res.data)

            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            
            navigate('/')
        }).catch((err) =>{
            console.log(err.response.data)
        })
    }

    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-orange-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-yellow-900 md-6 text-center">Login</h2>
                <form 
                      onSubmit={submitHandler} 
                      className="mt-4">
                    <div className="mb-5">
                        <label className="block text-gray-400 md-2" htmlFor="email">Email</label>
                        <input 
                               onChange={(e) => setEmail(e.target.value)}
                               type="email"
                               id="email"
                               className="w-full p-2 rounded bg-orange-100
                                text-black focus:outline-none focus:ring-2
                                 focus:ring-green-100 "
                                 required
                        />
                    </div>
                    <div className="md-5">
                        <label className="block text-gray-400 md-2" htmlFor="password">Password</label>
                        <input 
                               onChange={(e) => setPassword(e.target.value)}
                               type="password"
                               id="password"
                               className="w-full p-2 rounded bg-orange-100
                                text-black focus:outline-none focus:ring-2
                                 focus:ring-green-100"
                                 required
                        />
                    </div>
                    <button type="submit"
                            className="w-full bg-gray-400 text-white p-2 rounded mt-7 hover:bg-gray-500 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-400 mt-4">
                Don't have an account? 
                <Link
                        to="/register"
                        className="text-blue-500 hover:underline"
                        >Create One</Link>
                </p>
            </div>
        </div>
    )
}
export default Login;