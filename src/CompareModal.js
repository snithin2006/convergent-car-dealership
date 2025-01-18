import React from 'react';
import './CompareModal.css';

const CompareModal = ({ cars, onClose }) => {
  return (
    <div className="main">
      {cars.map((car, index) => (
        <div className="card" key={index}>
          <div className="image">
            <img src={car.image} alt={car.model} />
          </div>

          <button onClick={onClose} className="exit">X</button>

          <div className="content">
            <h2 className="car-title">{car.make} {car.model}</h2>
            <div className="divider"></div>

            <div className="info">
              <div className="details">
                <div className="left">
                  <p><span>Year:</span> {car.year}</p>
                  <p><span>Mileage:</span> {car.mileage} miles</p>
                  <p><span>Condition:</span> {car.condition}</p>
                  <p><span>Fuel Type:</span> {car.fuel_type}</p>
                  <p><span>Transmission:</span> {car.transmission}</p>
                </div>
                <div className="right">
                  <p><span>Price:</span> ${car.price}</p>
                  <p><span>Color:</span> {car.color}</p>
                  <p><span>VIN:</span> {car.vin}</p>
                </div>
              </div>
              <div className="description">
                <h3>Description:</h3>
                <p>{car.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompareModal;
