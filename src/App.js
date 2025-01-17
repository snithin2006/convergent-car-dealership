import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "./Modal";

const App = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get("https://dealership.naman.zip/cars/sort?direction=asc&key=price");
        setCars(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCars();
  }, []);

  const openModal = (movie) => {
    setSelectedCar(movie);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };


  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="title">Cars Dealership</h1>
      <div className="car-list">
        {cars.map((car) => (
          <div className="car-item" key={car.id} onClick={() => openModal(car)}>
            <img src={car.image} alt={car.id} width="200" />
            <p>{car.make} {car.model} - ${car.price}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        id={selectedCar?.id}
        make={selectedCar?.make}
        model={selectedCar?.model}
        year={selectedCar?.year}
        price={selectedCar?.price}
        image={selectedCar?.image}
      />
    </div>
  );
};

export default App;
