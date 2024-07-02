import axios from "axios";
import React, { useState } from 'react'

const SearchBar = ({handleSubmit}) => {
    const [start_dest, setStartDest] = useState("");
    const [end_dest, setEndDest] = useState("");
    const [num_seats, setNumSeats] = useState(0);
    const [date, setDate] = useState(Date.now);

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(start_dest, end_dest, num_seats, date);
    }

    const swapLocations = ()=>{
            let previous = start_dest;
            setStartDest(end_dest);
            setEndDest(previous);
    }

    return (
        <div className='flex w-full '>
            <form className="flex rounded-lg flex-1 shadow-gray-200  shadow-xl">
                <div className="flex flex-row flex-1 items-center rounded-lg hover:bg-gray-100 group transition-colors duration-200">
                    <img alt="location_tag" className='w-6 h-6' src='location_tag.png' />
                    <input
                        className='w-full py-4 bg-white group-hover:bg-gray-100 transition-colors duration-200 focus:outline-none '
                        placeholder='Idem iz'
                        type='text'
                        value={start_dest}
                        onChange = {(e)=> {setStartDest(e.target.value)}}
                        id='start_dest' />
                    <img className='w-6 h-6' onClick={swapLocations} src='swap.png' alt='swap_icon' />
                </div>
                <div className="flex flex-row flex-1 rounded-lg items-center hover:bg-gray-100 group transition-colors duration-200  ">
                    <img alt="location_tag"  className='w-6 h-6' src='location_tag.png' />
                    <input
                        className='w-full py-4 group-hover:bg-gray-100 focus:outline-none transition-colors duration-200'
                        placeholder='Idem u'
                        type='text'
                        value={end_dest}
                        onChange = {(e)=> {setEndDest(e.target.value)}}
                        id='end_dest' />
                </div>
                <div className="flex flex-row flex-1  rounded-lg items-center hover:bg-gray-100 group transition-colors duration-200">
                    <img alt="person"  className='w-6 h-6' src='person.png' />
                    <input
                        className='w-full py-4 group-hover:bg-gray-100 focus:outline-none transition-colors duration-200'
                        placeholder='Broj sedista'
                        type='number'
                        onChange = {(e)=> {setNumSeats(e.target.value)}}
                        id='start_dest' />
                </div>
                <div className="flex flex-row flex-1  rounded-lg items-center hover:bg-gray-100 group transition-colors duration-200">
                    <img alt="calendar"  className='w-6 h-6' src='calendar.png' />
                    <input
                        className='w-full py-4 group-hover:bg-gray-100 focus:outline-none transition-colors duration-200'
                        placeholder='Danas'
                        onChange = {(e)=> {setDate(e.target.value)}}
                        type='date'
                        id='start_dest' />
                </div>
                <div className="flex flex-row items-center rounded-r-lg bg-blue-500 px-8 py-2 group hover:bg-blue-700 transition-colors duration-200">
                    <img alt="search_icon"  className='w-6 h-6' src='search.png' />
                    <button className='bg-blue-500 rounded-r-lg text-white font-bold group-hover:bg-blue-700 transition-colors duration-200' onClick={onSubmit}>Pretrazi</button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar;