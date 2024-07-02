import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Nav = ({ tab }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRotated, setRotated] = useState(false);

  const handleArrowClick = () => {
    setIsVisible(!isVisible);
    setRotated(!isRotated);
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    if (!!localStorage.getItem("authToken")) {
      localStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  const redirectPutovanja = () => {
    if (!!localStorage.getItem("authToken")) {
      navigate("/history");
    }
  };

  return (
    <nav className="w-full flex flex-row flex-wrap py-4">
      <div className="flex flex-1 items-center">
        <img
          alt="logo_image"
          className="w-12 h-12 rounded-full"
          src="/logo.jpg"
        />
        <h1 className="text-3xl font-bold text-gray-800">CarShare</h1>
      </div>
      <div className="flex flex-1 justify-end relative">
        <img alt="acc_image" className="w-14 h-14" src="/acc_pic.png" />
        {isRotated ? (
          <img
            alt="arrow_down"
            className="w-14 h-14 rotate-180 ease-in-out transition-all"
            src="/arrow-down.png"
            onClick={handleArrowClick}
          />
        ) : (
          <img
            alt="arrow_down"
            className="w-14 h-14 ease-in-out transition-all"
            src="/arrow-down.png"
            onClick={handleArrowClick}
          />
        )}

        {isVisible ? (
          <div className="flex flex-col absolute top-16 right-0 w-52 bg-white shadow-2xl ">
            {tab == "passenger" ? (
              <div
                onClick={redirectPutovanja}
                className="flex items-center py-4 px-2 justify-left hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
              >
                <img alt="settings" className="w-10 h-10" src="/history.png" />
                <p>Putovanja</p>
              </div>
            ) : (
              <div
                onClick={redirectPutovanja}
                className="flex items-center py-4 px-2 justify-left hover:bg-gray-100 transition-colors duration-150 cursor-pointer"
              >
                <img alt="settings" className="w-10 h-10" src="/history.png" />
                <p>Sve voznje</p>
              </div>
            )}
            <div className="flex items-center py-4 px-2 justify-left hover:bg-gray-100 transition-colors duration-150 cursor-pointer">
              <img alt="settings" className="w-10 h-10" src="/settings.png" />
              <p>Settings</p>
            </div>
            <div
              className="flex items-center py-4 px-2 hover:bg-gray-100 transition-colors duration-150 cursor-pointer justify-left"
              onClick={handleLogout}
            >
              <img alt="Logout" className="w-10 h-10" src="/logout.png" />
              <p className="text-red-600">Logout</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col absolute top-16 right-0 w-52 px-4 py-2 hidden  bg-white shadow-2xl ">
            <div className="flex items-center justify-left">
              <img alt="settings" className="w-10 h-10" src="/settings.png" />
              <p>Settings</p>
            </div>
            <div className="flex items-center justify-left">
              <img alt="logout" className="w-10 h-10" src="/logout.png" />
              <p className="text-red-600">Logout</p>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
