import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, id, make, model, year, price, mileage, condition, fuel_type, transmission, color, vin, image, description }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                setIsActive(true);
            }, 100);
        } else {
            setIsActive(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="main" onClick={onClose}>
            <div
                className={`card ${isActive ? 'active' : ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="image">
                    <img src={image} alt={model} />
                </div>

                <button onClick={onClose} className="exit">X</button>

                <div className="content">
                    <h2 className="car-title">{make} {model}</h2>
                    <div className="divider"></div>

                    <div className="info">
                        <div className="details">
                            <div className="left">
                                <p><span>Year:</span> {year}</p>
                                <p><span>Mileage:</span> {mileage} miles</p>
                                <p><span>Condition:</span> {condition}</p>
                                <p><span>Fuel Type:</span> {fuel_type}</p>
                                <p><span>Transmission:</span> {transmission}</p>
                            </div>
                            <div className="right">
                                <p><span>Price:</span> ${price}</p>
                                <p><span>Color:</span> {color}</p>
                                <p><span>VIN:</span> {vin}</p>
                            </div>
                        </div>
                        <div className="description">
                            <h3>Description:</h3>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;