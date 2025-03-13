import React, { useState, useEffect } from 'react';
import '../assets/Modal.css';

const Modal = ({ pizza, optionalIngredients, onClose, onAddToCart }) => {
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    useEffect(() => {
        console.log("Modal received optionalIngredients:", optionalIngredients); // Debug log
    }, [optionalIngredients]);

    const handleIngredientChange = (ingredient) => {
        setSelectedIngredients(prevState => {
            if (prevState.includes(ingredient)) {
                return prevState.filter(ing => ing !== ingredient);
            } else {
                return [...prevState, ingredient];
            }
        });
    };

    const handleAddToCart = () => {
        onAddToCart(pizza, selectedIngredients);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>{pizza.name}</h2>
                <p>{pizza.description}</p>
                <p>Prix: €{pizza.price}</p>
                <div className="optional-ingredients">
                    <h3>Ingrédients optionnels</h3>
                    <ul>
                        {optionalIngredients.map(ingredient => (
                            <li key={ingredient.id}>
                                <label className="ingredient-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedIngredients.includes(ingredient)}
                                        onChange={() => handleIngredientChange(ingredient)}
                                    />
                                    {ingredient.name} (+€{ingredient.price})
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart}>
                    Ajouter au panier
                </button>
            </div>
        </div>
    );
};

export default Modal;