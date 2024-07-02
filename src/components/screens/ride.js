import React from 'react'
import { useNavigate } from 'react-router-dom'

const Ride = ({id, start_dest, end_dest, start_time, end_time, price, first_name}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/ride/${id}`);
    }
    return (
        <div onClick={handleClick}className='flex flex-col flex-wrap px-4 py-6 rounded-xl w-4/5 shadow-gray-400 shadow-md ml-auto mr-auto hover:ring-2 hover: ring-blue-500 hover: ring-inset hover:cursor-pointer  bg-white'>
            <div className='flex flex-row mb-10'>
                <div className='flex flex-row flex-1 '>
                    <div className=''>
                        <p className='text-gray-800 text-base font-bold sm:text-lg md:text-xl lg:text-xl '>{start_time}</p>
                        <p className='text-gray-800 text-base font-bold sm:text-lg md:text-xl lg:text-xl'>{start_dest}</p>
                    </div>
                    <div className='ml-auto'>
                        <p className='text-gray-800 text-base font-bold sm:text-lg md:text-xl lg:text-xl'>{end_time}</p>
                        <p className='text-gray-800 text-base font-bold sm:text-lg md:text-xl lg:text-xl'>{end_dest}</p>
                    </div>
                </div>
                <div className='flex-1 text-right'>
                    <p className='text-gray-800 text-base font-bold sm:text-lg md:text-xl lg:text-3xl'>{price}RSD</p>
                </div>
            </div>
            <div className='flex flex-row items-center px-4 py-2 gap-2 border-t-2 border-gray-200'>
                <img className='w-8 h-8' src='car.png' alt='car icon' />
                <img className='w-10 h-10' src='acc_pic.png' alt='profile icon' />
                <h1 className='text-gray-600 font-bold'>{first_name}</h1>
            </div>
        </div>

    )
}


export default Ride;