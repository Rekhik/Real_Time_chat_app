import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/user.context';
import axios from "../config/axios";

const Register = ()=>{


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext)

    const navigate = useNavigate()

    function submitHandler(e) {

        e.preventDefault()

        axios.post('/users/register',{
            email,
            password
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            setUser(res.data.user)
            navigate('/')
        }).catch((err) => {
            if (err.response) {
                // Server responded with error
                console.log(err.response.data)
            } else if (err.request) {
                // Request was made but no response
                console.log('No response received')
            } else {
                // Error in request setup
                console.log('Error:', err.message)
            }
        })
    }


    return(
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-orange-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-red-800 md-6 text-center">Register</h2>
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
                        Register
                    </button>
                </form>
                <p className="text-gray-400 mt-4">All ready have an account?
                    <Link to="/login"className="text-blue-500 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
};
export default Register;