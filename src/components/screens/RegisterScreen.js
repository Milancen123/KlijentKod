import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [tab, setTab] = useState('passenger'); // Initialize state for tab selection
    const [firstName, setFirstName] = useState(''); // Initialize state for first name input
    const [lastName, setLastName] = useState(''); // Initialize state for last name input
    const [email, setEmail] = useState(''); // Initialize state for email input
    const [password, setPassword] = useState(''); // Initialize state for password input
    const [carModel, setCarModel] = useState(''); // Initialize state for car model input (driver-specific)
    const [bankAcc, setBankAcc] = useState(''); // Initialize state for bank account input (driver-specific)
    const [plateNumber, setPlateNumber] = useState(''); // Initialize state for plate number input (driver-specific)

    const navigate = useNavigate();

    const handleTabChange = (selectedTab) => {
        setTab(selectedTab);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("REGISTROVAO SAM SE");
        const formData = {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            ...(tab === 'driver' && {
                car_model: carModel,
                bank_acc: bankAcc,
                plate_number: plateNumber
            })
        };

        try {
            const api = tab=='passenger'?"/api/auth/register":"/api/auth/register_driver";
            const response = await fetch(`http://localhost:5000${api}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.status === 'ok') {
                console.log(data);
                // Redirect or show success message
                navigate('/login'); // Redirect to login page
            }
            // Handle response data as needed (e.g., display error messages)
            console.log('Registration successful:', data);
        } catch (error) {
            console.error('Error registering:', error);
            // Handle error (e.g., display error message to user)
        }
    };

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
                        <h1 className='mb-4'>Sign Up as a passenger</h1>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
                            >
                                Register
                            </button>
                        </form>
                    </div>
                )}
                {tab === 'driver' && (
                    <div className='flex flex-col items-center'>
                        <h1 className='mb-4'>Sign Up as a driver</h1>
                        <form className='flex flex-col' onSubmit={handleSubmit}>
                            <input
                                type='text'
                                placeholder='First Name'
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Car Model'
                                value={carModel}
                                onChange={(e) => setCarModel(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Bank Account'
                                value={bankAcc}
                                onChange={(e) => setBankAcc(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <input
                                type='text'
                                placeholder='Plate Number'
                                value={plateNumber}
                                onChange={(e) => setPlateNumber(e.target.value)}
                                className='mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500'
                                required
                            />
                            <button
                                type='submit'
                                className='bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200'
                            >
                                Register
                            </button>
                        </form>
                    </div>
                )}
                <span className='mt-4 text-blue-500 cursor-pointer' onClick={() => navigate('/login')}>
                    Return to Login
                </span>
            </div>
        </div>
    );
};

export default Signup;
