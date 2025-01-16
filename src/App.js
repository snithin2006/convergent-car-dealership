import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://dealership.naman.zip/cars");
        setCars(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCars();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="title">Cars List</h1>
      <div className="car-list">
        {cars.map((car) => (
          <div className="car-item" key={car.id}>
            <img src={car.image} alt={car.id} width="200" />
            <p>{car.make} {car.model} - ${car.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
