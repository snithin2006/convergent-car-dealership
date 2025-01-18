import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Modal from "./Modal";
import CompareModal from "./CompareModal";

const App = () => {
  const [cars, setCars] = useState([]);
  const [dropdown1, setDropdown1] = useState(false);
  const [dropdown2, setDropdown2] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("price");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [compare, setCompare] = useState(false);
  const [carsSelected, setCarsSelected] = useState([]);

  const fetchCars = useCallback(async () => {
    const response = await axios.get(`https://dealership.naman.zip/cars/sort?direction=${selectedOrder}&key=${selectedCategory}`);
    setCars(response.data);
  }, [selectedOrder, selectedCategory]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const openModal = async (car) => {
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
  };

  const toggleDropdown2 = () => {
    setDropdown2(!dropdown2);
  };

  const handleSelectOrder = async (item) => {
    setSelectedOrder(item);
    setDropdown1(!dropdown1);
  };

  const handleSelectCategory = async (item) => {
    setSelectedCategory(item);
    setDropdown2(!dropdown2);
  };

  const toggleCompare = () => {
    setCarsSelected([]);
    setCompare(!compare);
    setIsModalOpen(false);
  };

  const selectCar = async (inputCar) => {
    const response = await axios.get(`https://dealership.naman.zip/car/${inputCar.id}`);
    const car = response.data;

    setCarsSelected((prevCars) => {
      if (!prevCars.some((c) => c.id === car.id)) {
        return [...prevCars, car];
      }
      return prevCars;
    });

    if (carsSelected.length === 2) {
      setCarsSelected((prevCars) => prevCars.slice(1));
    }
  };

  const deselectCar = (car) => {
    setCarsSelected((prevCars) => prevCars.filter((c) => c.id !== car.id));
  };

  const closeCompareModal = () => {
    setCarsSelected([]);
  };

  const openCompareModal = () => {
    return carsSelected.length === 2;
  };

  return (
    <div>
      <h1 className="title">Car Dealership</h1>

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

      <button
        className={`compare-button ${compare ? 'active' : 'inactive'}`}
        onClick={toggleCompare}
      >
        Compare
      </button>

      <div className="car-list">
        {cars.map((car) => (
          <div
            className={`car-item ${carsSelected.some((c) => c.id === car.id) ? 'compare' : ''}`}
            key={car.id}
            onClick={() => {
              if (compare) {
                if (carsSelected.some((c) => c.id === car.id)) {
                  deselectCar(car);
                } else {
                  selectCar(car);
                }
              } else {
                openModal(car);
              }
            }}
          >
            <img src={car.image} alt={car.id} width="200" />
            <p>{car.make} {car.model} - ${car.price}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen && !compare}
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

      {/* Compare Modal for car comparison */}
      {openCompareModal() && (
        <CompareModal
          cars={carsSelected}
          onClose={closeCompareModal}
        />
      )}
    </div>
  );
};

export default App;
