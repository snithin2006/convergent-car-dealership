import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "./Modal";

const App = () => {
  const [cars, setCars] = useState([]);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("price");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchCars = useCallback(async () => {
    const response = await axios.get(`https://dealership.naman.zip/cars/sort?direction=${selectedOrder}&key=${selectedCategory}`);
    setCars(response.data);
  }, [selectedOrder, selectedCategory]);
  
  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const openModal = async (car) => {
    console.log(car.id);
    const response = await axios.get(`https://dealership.naman.zip/car/${car.id}`);

    setSelectedCar(response.data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setIsModalOpen(false);
  };

  const toggleDropdown1 = () => {
    setDropdown1(!dropdown1);
  }

  const toggleDropdown2 = () => {
    setDropdown2(!dropdown2);
  }

  const handleSelectOrder = async (item) => {
    setSelectedOrder(item);
    setDropdown1(!dropdown1)
  };

  const handleSelectCategory = async (item) => {
    setSelectedCategory(item);
    setDropdown2(!dropdown2)
  };


  return (
    <div>
      <h1 className="title">Cars Dealership</h1>

      <div className="dropdown-container">
        <button className="dropdown" onClick={toggleDropdown1}>
          Order
        </button>
        {dropdown1 && (
          <div className="dropdown-content">
            <p
              className="dropdown-item"
              onClick={() => handleSelectOrder("asc")}
            >
              Ascending
              {selectedOrder === "asc" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectOrder("desc")}
            >
              Descending
              {selectedOrder === "desc" && <span className="checkmark">✓</span>}
            </p>
          </div>
        )}
      </div>


      <div className="dropdown-container">
        <button className="dropdown" onClick={toggleDropdown2}>
          Category
        </button>
        {dropdown2 && (
          <div className="dropdown-content">
            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("make")}
            >
              Make
              {selectedCategory === "make" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("model")}
            >
              Model
              {selectedCategory === "model" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("year")}
            >
              Year
              {selectedCategory === "year" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("price")}
            >
              Price
              {selectedCategory === "price" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("mileage")}
            >
              Mileage
              {selectedCategory === "mileage" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("condition")}
            >
              Condition
              {selectedCategory === "condition" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("fuel_type")}
            >
              Fuel Type
              {selectedCategory === "fuel_type" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("transmission")}
            >
              Transmission
              {selectedCategory === "transmission" && <span className="checkmark">✓</span>}
            </p>

            <p
              className="dropdown-item"
              onClick={() => handleSelectCategory("color")}
            >
              Color
              {selectedCategory === "color" && <span className="checkmark">✓</span>}
            </p>


          </div>
        )}
      </div>





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
        mileage={selectedCar?.mileage}
        condition={selectedCar?.condition}
        fuel_type={selectedCar?.fuel_type}
        transmission={selectedCar?.transmission}
        color={selectedCar?.color}
        vin={selectedCar?.vin}
        image={selectedCar?.image}
        description={selectedCar?.description}
      />
    </div>
  );
};

export default App;
