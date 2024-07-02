import React, { useState } from "react";
import Nav from "./nav";
import axios from 'axios';

const DriverPrivateScreen = () => {
    const [numSeats, setNumSeats] = useState(1);
    const [priceInCents, setPriceInCents] = useState(0);
    const [startDest, setStartDest] = useState("");
    const [endDest, setEndDest] = useState("");
    const [startTime, setStartTime] = useState("");
    const [dateOfDepart, setDateOfDepart] = useState("");
    const [estimatedTime, setEstimatedTime] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const convertedPriceInCents = parseInt((parseFloat(priceInCents) / 117) * 100);
        if (isNaN(convertedPriceInCents)) {
            console.log("Invalid price value");
            return;
        }
        console.log({
            numSeats,
            priceInCents: convertedPriceInCents,
            startDest,
            endDest,
            startTime,
            dateOfDepart,
            estimatedTime,
        });
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
        
            const response = await axios.post('http://localhost:5000/api/driver/ride', 
                {numSeats, priceInCents: convertedPriceInCents, startDest, endDest, startTime, dateOfDepart, estimatedTime},
                config
            );
            console.log(response);
        } catch (err) {
            console.log(err);
        }
        // Handle the form submission
    }
    
    

    const converPriceInCents = (price)=>{
        setPriceInCents(price/100)
    }

    return (
        <div className="w-full h-screen flex flex-col bg-white flex items-center justify-center">
            <div className="w-full max-w-4xl  bg-white">
                <Nav tab="driver" />
            </div>
            <div className="w-full max-w-2xl p-2 rounded-m shadow-gray-400 shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Dodaj voznju</h1>
                <form className="flex flex-col max-w-md space-y-1 ml-auto mr-auto" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="numSeats" className="block text-sm font-medium text-gray-700">Broj slobodnih mesta</label>
                        <input
                            type="number"
                            id="numSeats"
                            value={numSeats}
                            onChange={(e) => setNumSeats(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="priceInCents" className="block text-sm font-medium text-gray-700">Cena(RSD)</label>
                        <input
                            type="text"
                            id="priceInCents"
                            value={priceInCents}
                            onChange={(e) => setPriceInCents(e.target.value)} //on submit convert it into cents !!!!!!!!!!
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="startDest" className="block text-sm font-medium text-gray-700">Idem iz</label>
                        <input
                            type="text"
                            id="startDest"
                            value={startDest}
                            onChange={(e) => setStartDest(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="endDest" className="block text-sm font-medium text-gray-700">Idem u</label>
                        <input
                            type="text"
                            id="endDest"
                            value={endDest}
                            onChange={(e) => setEndDest(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Vreme polaska</label>
                        <input
                            type="time"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="dateOfDepart" className="block text-sm font-medium text-gray-700">Datum polaska</label>
                        <input
                            type="date"
                            id="dateOfDepart"
                            value={dateOfDepart}
                            onChange={(e) => setDateOfDepart(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="estimatedTime" className="block text-sm font-medium text-gray-700">Vreme trajanja putovanja</label>
                        <input
                            type="text"
                            id="estimatedTime"
                            value={estimatedTime}
                            onChange={(e) => setEstimatedTime(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                        Objavi voznju
                    </button>
                </form>
            </div>
            
        </div>
    );
};

export default DriverPrivateScreen;
