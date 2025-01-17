import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, id, make, model, year, price, image }) => {
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
                    <h2>{make} {model}</h2>
                    <p>id: {id}</p>
                    <p>year: {year}</p>
                    <p>year: ${price}</p>
                </div>
            </div>
        </div>
    );
};

export default Modal;