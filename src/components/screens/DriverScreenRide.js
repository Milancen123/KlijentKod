import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from "./nav";

const DriverScreenRide = () => {
  const { ride_id } = useParams();
  const navigate = useNavigate();
  const [rideData, setRideData] = useState(null);
  const [passengersData, setPassengersData] = useState([]);
  const [passengersChange, setPassengersChange] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [error, setError] = useState("");
  const [available, setAvailable] = useState(false);
  const [updateScreen, setUpdateScreen] = useState(false);
  const [formData, setFormData] = useState({
    date_start: "",
    time_start: "",
    time_end: "",
    start_dest: "",
    end_dest: "",
    price: "",
  });

  const checkRideAvailability = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/driver/checkRide/${ride_id}`,
        config
      );
      if (response.data.success) {
        setAvailable(true);
      } else {
        setError("Voznja vise nije aktivna, vrati se nazad");
      }
    } catch (err) {}
  };

  const getPassengers = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.get(
        `http://localhost:5000/api/driver/getPassengers/${ride_id}`,
        config
      );
      if (response.data.success) {
        setPassengersData(response.data.data);
        setPassengersChange(true);
      }
    } catch (err) {}
  };

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
        await checkRideAvailability();
        const response = await axios.get(
          `http://localhost:5000/api/driver/searchRides/${ride_id}`,
          config
        );

        await getPassengers();

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
        setFormData({
          date_start: date.toISOString().split("T")[0],
          time_start: date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          time_end: end_time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          start_dest: ride.start_dest,
          end_dest: ride.end_dest,
          price: (ride.price_in_cents / 100) * 117,
        });
      } catch (err) {
        setError("Putovanje je otkazano vratite se na prethodni ekran");
      }
    };
    fetchRideData();
  }, [ride_id, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!rideData) {
    return (
      <div className="flex items-center justify-center">
        <div className="loader"></div>
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
      if (!response.data.success) setError("Something went wrong");

      if (response.data.success) {
        setReservation(true);
        await getPassengers();
      }
    } catch (err) {
      setError("There was an error fetching the data");
    }
  };

  const otkaziRezervaciju = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.delete(
        `http://localhost:5000/api/driver/deleteRide/${ride_id}`,
        config
      );
      if (!response.data.success) setError("Something went wrong");
      if (response.data.success) {
        setAvailable(false);
      }
    } catch (err) {
      setError("There was an error fetching the data");
    }
  };

  const updateRide = () => {
    setUpdateScreen(true);
  };

  const closeUpdateScreen = () => {
    setUpdateScreen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const response = await axios.put(
        `http://localhost:5000/api/driver/updateRide/${ride_id}`,
        formData,
        config
      );
      if (response.data.success) {
        setRideData({
          ...rideData,
          ...formData,
          date: new Date(formData.date_start),
          start_time: formData.time_start,
          end_time: formData.time_end,
          start_dest: formData.start_dest,
          end_dest: formData.end_dest,
          price: parseFloat(formData.price),
        });
        closeUpdateScreen();
      } else {
        setError("Update failed");
      }
    } catch (err) {
      setError("There was an error updating the ride");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white px-6">
        <section className="flex flex-col ml-auto mr-auto py-3">
          <Nav />
        </section>
      </header>
      <div className="flex-1 flex flex-col w-2/5 text-center ml-auto mr-auto">
        <div className="flex-grow">
          <div className="flex justify-center">
            <h1 className="text-4xl text-gray-800 font-bold mr-10">
              {rideData.date.toLocaleDateString("sr-RS", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h1>
            <img
              onClick={updateRide}
              className="w-10 h-10 cursor-pointer"
              alt="edit"
              src="/edit.png"
            />
          </div>
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
          <div className="h-2/6 flex flex-col items-start flex-grow">
            <h1 className="text-gray-700 font-bold">Putnici</h1>
            <div className="overflow-y-auto w-full">
              {passengersChange &&
                passengersData.map((passenger, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center mt-2 py-2 w-full rounded-xl hover:bg-gray-200 transition-colors duration-200"
                    >
                      <img className="w-7 h-7" alt="acc_pic" src="/acc_pic.png" />
                      <h1 className="text-lg">{passenger.first_name}</h1>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-2 -mt-14 border-gray-400 border-t-2">
          {available ? (
            <button
              onClick={otkaziRezervaciju}
              className="px-4 py-2 bg-red-500 rounded-xl text-white font-bold shadow-gray-500 shadow-md hover:bg-red-600 transition-colors duration-200"
            >
              Otkazite voznju
            </button>
          ) : (
            <button className="px-4 py-2 bg-red-500 rounded-xl text-white font-bold shadow-gray-500 shadow-md hover:bg-red-600 transition-colors duration-200">
              Voznja je otkazana
            </button>
          )}
        </div>
      </div>

      {updateScreen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="relative bg-white p-8 rounded-lg w-1/2">
              <button
                className="absolute top-2 right-2 text-2xl font-bold"
                onClick={closeUpdateScreen}
              >
                X
              </button>
              <h2 className="text-2xl font-bold mb-4">Izmeni detalje o voznji</h2>
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <label>
                  Datum polaska:
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    name="date_start"
                    value={formData.date_start}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Vreme polaska:
                  <input
                    type="time"
                    className="w-full p-2 border rounded"
                    name="time_start"
                    value={formData.time_start}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Vreme trajanja putovanja:
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    name="time_end"
                    value={formData.time_end}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Pocetna destinacija:
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    name="start_dest"
                    value={formData.start_dest}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Krajnja destinacija:
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    name="end_dest"
                    value={formData.end_dest}
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Cena po putniku:
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </label>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded font-bold hover:bg-blue-600 transition-colors duration-200"
                >
                  Izmeni voznju
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DriverScreenRide;
