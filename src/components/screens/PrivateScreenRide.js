import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./nav";

const PrivateScreenRide = ({tab}) => {
  const { ride_id } = useParams();
  const navigate = useNavigate();
  const [rideData, setRideData] = useState(null); // Changed to null to handle the loading state
  const [passengersData, setPassengersData] = useState([]);
  const [passengersChange, setPassengersChange] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [error, setError] = useState("");

  const checkReservation = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/private/checkReservation/${ride_id}`,
        config
      );
      console.log("REsponse for reservation: ");
      console.log(response);
      if (response.data.success) {
        if (response.data.reserved) {
          setReservation(true);
        } else {
          setReservation(false);
        }
      }
    } catch (err) {}
  };

  

  const getPassengers = async() => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/private/getPassengers/${ride_id}`,
        config
      );
      console.log("Response for ALL PASSENGERS ");
      console.log(response.data.data);
      if (response.data.success) {
        setPassengersData(response.data.data);
        setPassengersChange(true);
      }
    } catch (err) {}
  }

  useEffect(() => {
    const fetchRideData = async () => {
      if (!localStorage.getItem("authToken")) {
        navigate("/login");
        return;
      }
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };

        await checkReservation();
        console.log(reservation ? "Rezervisano je vec" : "Nije rezervisano");
        const response = await axios.get(
          `http://localhost:5000/api/private/searchRides/${ride_id}`,
          config
        );

        await getPassengers();

        console.log("OVO SU SVI PUTNICI U LISTI:")
        console.log(passengersData);

        const ride = response.data.data;
        const date = new Date(ride.date_of_depart);
        const estimatedTimeParts = ride.estimated_time.split(":");
        const estimatedHours = parseInt(estimatedTimeParts[0]);
        const estimatedMinutes = parseInt(estimatedTimeParts[1]);

        const end_time = new Date(date);
        end_time.setHours(end_time.getHours() + estimatedHours);
        end_time.setMinutes(end_time.getMinutes() + estimatedMinutes);

        const processedRide = {
          ...ride,
          date: date,
          start_time: date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          end_time: end_time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          price: (ride.price_in_cents / 100) * 117,
        };

        setRideData(processedRide);
        console.log("OVO SU PDACI");
        console.log(processedRide);
      } catch (err) {
        setError("There was an error fetching the ride data");
      }
    };
    fetchRideData();

    //fetchRideData();
  }, [ride_id, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!rideData) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader"></div> {/* Loader spinner */}
      </div>
    );
  }

  const handleReservation = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/private/reserveRide/" + ride_id,
        {},
        config
      );
      console.log(response);
      if (!response.data.success) setError("Something went wrong");

      if (response.data.success) {
        setReservation(true)
        await getPassengers();
      };
    } catch (err) {
      setError("There was an error fetching the data");
    }
  };

  const otkaziRezervaciju = async()=>{
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.post(
        "http://localhost:5000/api/private/cancelRide/" + ride_id,
        {},
        config
      );
      console.log(response);
      if (!response.data.success) setError("Something went wrong");
      setReservation(false);
      await getPassengers();
    } catch (err) {
      setError("There was an error fetching the data");
    }
  }
  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white px-6">
        <section className="flex flex-col ml-auto mr-auto py-3">
          <Nav />
        </section>
      </header>
      <div className="flex-1 flex flex-col  w-2/5 text-center ml-auto mr-auto">
        <div className="flex-grow">
          <h1 className="text-4xl text-gray-800 font-bold">
            {rideData.date.toLocaleDateString("sr-RS", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </h1>
          <div className="flex flex-col items-start text-left text-lg font-bold mb-2 text-gray-800">
            <div className="py-2 w-full rounded-xl hover:bg-gray-200 transition-colors duration-200">
              <h1>{rideData.start_time}</h1>
              <h1>{rideData.start_dest}</h1>
            </div>
            <div className="py-2 w-full rounded-xl hover:bg-gray-200 transition-colors duration-200">
              <h1>{rideData.end_time}</h1>
              <h1>{rideData.end_dest}</h1>
            </div>
          </div>
          <div className="flex py-4 text-xl border-y-8">
            <h1>Ukupna cena za jednog putnika</h1>
            <h1 className="flex-1 text-right text-2xl font-bold">
              {rideData.price.toFixed(2)} RSD
            </h1>
          </div>
          <div className="flex items-center mt-2 py-2 w-full rounded-xl hover:bg-gray-200 transition-colors duration-200">
            <img className="w-12 h-12" alt="acc_pic" src="/acc_pic.png" />
            <h1 className="text-lg">{rideData.first_name}</h1>
          </div> 
          <div className=" h-2/6  flex flex-col items-start  flex-grow ">
            <h1 className="text-gray-700 font-bold">Putnici</h1>
            <div className="overflow-y-auto w-full">
            {passengersChange && 
              passengersData.map((passenger, index) => {
                return (
                  <div key={index} className="flex items-center mt-2 py-2 w-full rounded-xl hover:bg-gray-200 transition-colors duration-200">
                    <img className="w-7 h-7" alt="acc_pic" src="/acc_pic.png" />
                    <h1 className="text-lg">{passenger.first_name}</h1>
                  </div>
                );
              })
            }
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2 -mt-14 border-gray-400 border-t-2 ">
          {reservation ? (
            <button onClick={otkaziRezervaciju} className="px-4 py-2 bg-red-500 rounded-xl text-white font-bold shadow-gray-500 shadow-md hover:bg-red-600 transition-colors duration-200">
              Otkazite rezervaciju
            </button>
          ) : (
            <button
              onClick={handleReservation}
              className="px-4 py-2 bg-cyan-500 rounded-xl text-white font-bold shadow-gray-500 shadow-md hover:bg-cyan-600 transition-colors duration-200"
            >
              Rezervisite putovanje
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateScreenRide;
