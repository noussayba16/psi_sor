import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import '../assets/Menu.css'; // We'll create this file next

const Menu = () => {
    const [pizzas, setPizzas] = useState([]);
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [optionalIngredients, setOptionalIngredients] = useState([]);

    useEffect(() => {
        // Fetch pizzas when component mounts
        fetch('http://localhost:8080/api/pizzas')
            .then(response => response.json())
            .then(data => {
                console.log("Loaded pizzas:", data);
                setPizzas(data);
            })
            .catch(error => console.error('Error fetching pizzas:', error));
    }, []);

    const handleCommanderClick = (pizza, event) => {
        // Stop propagation to prevent the card click handler from firing
        event.stopPropagation();

        setSelectedPizza(pizza);
        // Fetch optional ingredients for this pizza
        fetch(`http://localhost:8080/api/ingredients/pizzas/${pizza.id}/optional-ingredients`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched optional ingredients:", data);
                setOptionalIngredients(data);
            })
            .catch(error => console.error('Error fetching optional ingredients:', error));
    };

    const handlePizzaClick = (pizza) => {
        // You can use this for showing details without ordering
        console.log("Pizza clicked:", pizza);
    };

    const handleCloseModal = () => {
        setSelectedPizza(null);
        setOptionalIngredients([]);
    };

    const handleAddToCart = (pizza, selectedIngredients) => {
        // Add to cart logic here
        console.log('Adding to cart:', pizza, selectedIngredients);
        handleCloseModal();
    };

    return (
        <div className="menu">
            <h1>Notre Menus</h1>
            <div className="pizza-grid">
                {pizzas.map(pizza => (
                    <div
                        key={pizza.id}
                        className="pizza-card"
                        onClick={() => handlePizzaClick(pizza)}
                    >
                        {pizza.photoUrl && (
                            <div className="pizza-image">
                                <img
                                    src={pizza.photoUrl}
                                    alt={pizza.name}
                                    onError={(e) => {
                                        e.target.src = '/images/default-pizza.jpg'; // Fallback image
                                        e.target.onerror = null;
                                    }}
                                />
                            </div>
                        )}
                        <div className="pizza-details">
                            <h2>{pizza.name}</h2>
                            <p className="description">{pizza.description}</p>
                            <div className="price-order">
                                <p className="price">Prix: €{pizza.price}</p>
                                <button
                                    className="commander-btn"
                                    onClick={(e) => handleCommanderClick(pizza, e)}
                                >
                                    Commander
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedPizza && (
                <Modal
                    pizza={selectedPizza}
                    optionalIngredients={optionalIngredients}
                    onClose={handleCloseModal}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default Menu;