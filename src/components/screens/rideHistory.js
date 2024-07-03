import React from 'react'
import { useNavigate } from 'react-router-dom';

const RideHistory = ({ id, date, start_dest, start_time, end_dest, end_time, first_name, type }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        if(type == 'passenger'){
            navigate(`/ride/${id}`);
        }else{
            navigate(`/driver/ride/${id}`);
        }
    };

    const getDateClass = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const rideDate = new Date(date);
        rideDate.setHours(0, 0, 0, 0);

        if (rideDate.getTime() === today.getTime()) {
            return "text-green-600";
        } else if (rideDate.getTime() > today.getTime()) {
            return "text-yellow-600";
        } else {
            return "text-red-600";
        }
    };

    return (
        <div
            onClick={handleClick}
            className="max-w-4xl ml-auto mr-auto border-gray-400 border-b-2 py-2 rounded-xl hover:bg-gray-100 hover:cursor-pointer transition-colors duration-200"
        >
            <div className="flex flex-row items-center gap-4">
                <div className={`px-4 text-xl font-bold w-1/6 ${getDateClass(date)}`}>
                    <h1>{date}</h1>
                </div>
                <div className="flex flex-row gap-5 font-semibold items-center w-1/3">
                    <div className='w-3/6'>
                        <p>{start_dest}</p>
                        <p>{start_time}</p>
                    </div>
                    <img className="w-8 h-8" alt="arr-right" src="arrow-right.png" />
                    <div className='w-3/6'>
                        <p>{end_dest}</p>
                        <p>{end_time}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center w-1/6 ml-auto">
                    <img className="w-10 h-10" alt="acc_pic.png" src="acc_pic.png" />
                    <h1>{first_name}</h1>
                </div>
            </div>
        </div>
    );
};

export default RideHistory;
