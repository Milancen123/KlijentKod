import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginScreen.css";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [tab, setTab] = useState("passenger");

    const handleTabChange = (tab) => {
        setTab(tab);
    }

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/");
        }
    }, [navigate]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password, tab},
                config
            );
            localStorage.setItem("authToken", data.token);
            if(tab == 'passenger'){
                navigate("/");
            }else{
                navigate("/driver");
            }
        } catch (err) {
            setError(err.response?.data?.error || err.message);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    const redirectSignUp = ()=>{
            navigate("/register");
    }
    return (
        <div className='flex items-center justify-center w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500'>
            <div className='flex flex-col bg-white rounded-lg p-8 shadow-lg'>
                <div className='flex mb-4'>
                    <div
                        className={`flex-1 text-center py-2 cursor-pointer ${tab === 'passenger' ? 'bg-red-500 text-white' : 'bg-red-200'}`}
                        onClick={() => handleTabChange('passenger')}
                    >
                        Passenger
                    </div>
                    <div
                        className={`flex-1 text-center py-2 cursor-pointer ${tab === 'driver' ? 'bg-red-500 text-white' : 'bg-red-200'}`}
                        onClick={() => handleTabChange('driver')}
                    >
                        Driver
                    </div>
                </div>
                {tab === 'passenger' && (
                    <div className='flex flex-col items-center'>
                        <h1 className='mb-4'>Login as a passenger</h1>
                        <form className='flex flex-col' onSubmit={loginHandler}>
                            <input
                                type='email'
                                placeholder='Email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
                            >
                                Login
                            </button>

                        </form>
                        <button onClick={redirectSignUp} className='bg-gray-300 text-gray-700 w-full py-2 rounded-lg mt-2 hover:bg-gray-400 transition-colors duration-200'>
                                SignUp
                            </button>
                    </div>
                )}
                {tab === 'driver' && (
                    <div className='flex flex-col items-center'>
                        <h1 className='mb-4'>Login as a driver</h1>
                        <form className='flex flex-col' onSubmit={loginHandler}>
                            <input
                                type='email'
                                placeholder='Email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
                            >
                                Login
                            </button>
                        </form>
                        <button onClick={redirectSignUp} className='bg-gray-300 w-full text-gray-700 py-2 rounded-lg mt-2 hover:bg-gray-400 transition-colors duration-200'>
                                SignUp
                            </button>
                    </div>
                )}
                 {error ? <div>{error}</div> : <div></div>}
            </div>
        </div>
    );
};

export default LoginScreen;
