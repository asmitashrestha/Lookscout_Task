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
  const [weatherDetails, setWeatherDetails] = useState([]);

  useEffect(() => {
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

  useEffect(() => {
    const getWeatherDetails = async () => {
      if (
        selectedCity &&
        selectedCity.value &&
        selectedCity.value.latitude &&
        selectedCity.value.longitude
      ) {
        const fetchWeatherDetails = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.value.latitude}&longitude=${selectedCity.value.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,uv_index_clear_sky_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max&wind_speed_unit=mph&timezone=GMT`
        );

        const data = await fetchWeatherDetails.json();
        setWeatherDetails(data);
      }
    };
    getWeatherDetails();
  }, [selectedCity]);

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
  };

  console.log("Data weather", weatherDetails);

  return (
    <div className="bg-cyan-500 min-h-screen flex justify-center">
      <div className="container bg-white flex justify-center relative top-16">
        <div>
          <div className="flex justify-center">
            <p className="text-gray-600 mr-2">Right now in</p>
            <div className="flex">
              <Select
                options={allCountries}
                value={selectedCountry}
                onChange={handleSelectedCountry}
                className="custom-select text-black font-bold text-xl w-32"
                style={{ marginRight: "5px" }}
              />
              <Select
                options={City.getCitiesOfCountry(
                  selectedCountry?.value?.isoCode
                ).map((city) => ({
                  value: {
                    latitude: city.latitude,
                    longitude: city.longitude,
                  },
                  label: city.name,
                }))}
                value={selectedCity}
                onChange={handleSelectedCity}
                className="custom-select  text-black font-bold text-xl w-32"
                style={{ marginRight: "5px" }}
              />
            </div>
            <p className="text-gray-600 ml-1">, it's mostly cloudy</p>
          </div>
          <div className="flex justify-between mt-16 px-20 md:px-[10px]">
            <div>
              <img src={Mix} alt="mix" className="w-20 rounded-full" />
            </div>
            <div className="">
              <p className="text-gray-950 text-[40px] ">
                {weatherDetails?.daily?.temperature_2m_max[0]}
              </p>
              <p className="text-gray-500 text-sm">
                {selectedCity?.value?.latitude} °| {""}
                {selectedCity?.value?.longitude} °
              </p>
            </div>
            <div className="text-gray-500">
              <div className="flex">
                <p className="mt-1 pr-2">
                  <CiTempHigh className="text-[20px]"/>
                </p>
                <p className="font-semibold text-xl">
                  {weatherDetails?.daily?.wind_speed_10m_max[0]}{" "}
                  <span className="text-[12px]">mph</span>
                </p>
              </div>
              <div className="flex">
                <p className="mt-1 pr-2">
                  <CiUmbrella className="text-[20px]"/>
                </p>
                <p className="font-semibold text-xl">
                  {weatherDetails?.current?.rain}{" "}
                  <span className="text-[12px]">%</span>
                </p>
              </div>
              <div className="flex">
                <p className="mt-1 pr-2">
                  <CiDroplet className="text[20px]"/>
                </p>
                <p className="font-semibold text-xl">
                  {weatherDetails?.current?.relative_humidity_2m}
                  <span className="text-[12px]"> %</span>
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
                  className="w-7 rounded-full mb-3  ml-5"
                />
                <div className="text-gray-500">
                  <p className="text-xl ">
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_max[3]
                    )}
                    °/{" "}
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_min[3]
                    )}
                    °
                  </p>
                  <p className="text-[12px] mt-2 ml-5">Wed</p>
                </div>
              </div>

              <div className="mr-5">
                <img
                  src={Mix}
                  alt="mix"
                  className="w-7 rounded-full mb-3  ml-5"
                />
                <div className="text-gray-500">
                  <p className="text-xl ">
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_max[4]
                    )}
                    °/{" "}
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_min[4]
                    )}
                    °
                  </p>
                  <p className="text-[12px] mt-2 ml-5">Thurs</p>
                </div>
              </div>

              <div className="mr-5">
                <img
                  src={Mix}
                  alt="mix"
                  className="w-7 rounded-full mb-3  ml-5"
                />
                <div className="text-gray-500">
                  <p className="text-xl ">
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_max[5]
                    )}
                    °/ {""}
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_min[5]
                    )}
                    °
                  </p>
                  <p className="text-[12px] mt-2 ml-5">Fri</p>
                </div>
              </div>

              <div className="mr-5">
                <img
                  src={Mix}
                  alt="mix"
                  className="w-7 rounded-full mb-3  ml-5"
                />
                <div className="text-gray-500">
                  <p className="text-xl ">
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_max[6]
                    )}
                    °/ {""}
                    {Math.round(
                      weatherDetails?.daily?.apparent_temperature_min[6]
                    )}
                    °
                  </p>
                  <p className="text-[12px] mt-2 ml-5">Sat</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
