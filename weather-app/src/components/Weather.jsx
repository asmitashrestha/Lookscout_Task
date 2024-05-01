import React, { useEffect, useState } from "react";
import { CiTempHigh } from "react-icons/ci";
import { CiUmbrella } from "react-icons/ci";
import { CiDroplet } from "react-icons/ci";
import Mix from "../assets/mix.jpeg";
import { City, Country } from "country-state-city";
import Select from "react-select";
const Weather = () => {
  const [unit, setUnit] = useState("F");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [selectedCity, setSelectedCity] = useState([]);
  const toggleUnit = () => {
    setUnit(unit === "F" ? "C" : "F");
  };

  useEffect(() => {
    // Use Country.getAllCountries() to get all countries
    setAllCountries(
      Country.getAllCountries().map((country) => ({
        value: {
          latitude: country.latitude,
          longitude: country.longitude,
          isoCode: country.isoCode,
        },
        label: country.name,
      }))
    );
  }, []);

  console.log(allCountries);

  const handleSelectedCountry = (option) => {
    setSelectedCountry(option);
    setSelectedCity(null);
  };

  const handleSelectedCity = (option) => {
    // Parse latitude and longitude to integers
    const parsedCity = {
      ...option,
      value: {
        latitude: parseInt(option.value.latitude),
        longitude: parseInt(option.value.longitude),
      },
    };
    setSelectedCity(parsedCity);
  }

  return (
    <div className="bg-cyan-500 min-h-screen flex justify-center">
      <div className="container bg-white flex justify-center relative top-16">
        <div>
          <div className="flex justify-center">
            <p className="text-gray-600 mr-2">
              Right now in 
             </p>
            <div className="flex">
              <Select
                options={allCountries}
                value={selectedCountry}
                onChange={handleSelectedCountry}
                className="custom-select border-none outline-none text-black font-bold text-xl"
                style={{ marginRight: "5px" }}
              />
              <Select
                options={City.getCitiesOfCountry(
                  selectedCountry?.value?.isoCode
                ).map((city)=>({
                  value: {
                    latitude: city.latitude,
                    longitude:city.longitude,
                  },
                  label:city.name,
                }))}
                value={selectedCity}
                onChange={handleSelectedCity}
                className="custom-select"
                style={{ marginRight: "5px" }}
              />
              <hr />
            </div>
            <p className="text-gray-600 ml-1">, it's mostly cloudy</p>
          </div>
          <div className="flex justify-between mt-9 px-20 md:px-[10px]">
            <div>
              <img src={Mix} alt="mix" className="w-20 rounded-full" />
            </div>
            <div className="">
              <p className="text-gray-950 text-[40px] ">99</p>
              <p className="text-gray-600 text-sm">{selectedCity?.value?.latitude} °| {""}
              {selectedCity?.value?.longitude} °</p>
              <h3>{selectedCountry?.label},{selectedCity?.label}</h3>
            </div>
            <div className="text-gray-600">
              <div className="flex">
                <p className="mt-1 pr-2">
                  <CiTempHigh />
                </p>
                <p>
                  22 <span className="text-[12px]">mph</span>
                </p>
              </div>
              <div className="flex">
                <p className="mt-1 pr-2">
                  <CiUmbrella />
                </p>
                <p>
                  0 <span className="text-[12px]">%</span>
                </p>
              </div>
              <div className="flex">
                <p className="mt-1 pr-2">
                  <CiDroplet />
                </p>
                <p>
                  60 <span className="text-[12px]">%</span>
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-between px-30 ml-3 mt-20">
              <div className="mr-5">
                <img
                  src={Mix}
                  alt="mix"
                  className="w-7 rounded-full mb-3 ml-2"
                />
                <div className="text-gray-600">
                  <p className="text-xl ">29/40</p>
                  <p className="text-[14px] mt-2 ml-2">Wed</p>
                </div>
              </div>

              <div className="mr-5">
                <img
                  src={Mix}
                  alt="mix"
                  className="w-7 rounded-full mb-3 ml-2"
                />
                <div className="text-gray-600">
                  <p className="text-xl">29/40</p>
                  <p className="text-[14px] mt-2 ml-2">Wed</p>
                </div>
              </div>

              <div className="mr-5">
                <img
                  src={Mix}
                  alt="mix"
                  className="w-7 rounded-full mb-3 ml-2"
                />
                <div className="text-gray-600">
                  <p className="text-xl">29/40</p>
                  <p className="text-[14px] mt-2 ml-2">Wed</p>
                </div>
              </div>

              <div className="mr-5">
                <img
                  src={Mix}
                  alt="mix"
                  className="w-7 rounded-full mb-3  ml-2"
                />
                <div className="text-gray-600">
                  <p className="text-xl">29/40</p>
                  <p className="text-[12px] mt-2 ml-2">Wed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-7">
            <button
              onClick={toggleUnit}
              className={`text-gray-600 ${unit === "F" ? "text-black" : ""}`}
            >
              F
            </button>
            <span className="mx-1">|</span>
            <button
              onClick={toggleUnit}
              className={`text-gray-600 ${unit === "C" ? "text-black" : ""}`}
            >
              C
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
