import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './nav';

const PassengerSettings = ({ history }) => {
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/login");
        }
        const fetchUserData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const { data } = await axios.get("http://localhost:5000/api/private/user", config);
                setUser(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
                history.push("/login");
            }
        }

        fetchUserData();
    }, [history]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({ ...prevState, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }
        try {
            await axios.put("http://localhost:5000/api/private/user", user, config);
            alert("Changes saved successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to save changes.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <header className='flex flex-col justify-center bg-white border-gray-200 border-b-2'>
                <section className="flex flex-col ml-auto mr-auto py-4">
                    <Nav tab="passenger" />
                </section>
            </header>
            <section className='flex flex-col items-center mt-10'>
                {error ? (
                    <span>Something Broke</span>
                ) : (
                    <form className='bg-white p-6 rounded shadow-md w-full max-w-md' onSubmit={handleSubmit}>
                        <h1 className='text-2xl font-semibold mb-4'>Settings</h1>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>First Name</label>
                            <input
                                type='text'
                                name='first_name'
                                value={user.first_name || ""}
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Last Name</label>
                            <input
                                type='text'
                                name='last_name'
                                value={user.last_name || ""}
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border-gray-300 rounded-md'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='block text-sm font-medium text-gray-700'>Password</label>
                            <input
                                type='password'
                                name='password'
                                value={user.password || ""}
                                onChange={handleChange}
                                className='mt-1 p-2 block w-full border-gray-300 rounded-md'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            disabled={loading}
                        >
                            {loading ? "Cuvanje..." : "Sacuvaj promene"}
                        </button>
                    </form>
                )}
            </section>
        </div>
    )
}

export default PassengerSettings;
