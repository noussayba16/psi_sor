import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import axios from 'axios'; // Ensure axios is installed

const PizzaList = () => {
    const [pizzas, setPizzas] = useState([]);
    const [selectedPizza, setSelectedPizza] = useState(null);
    const [optionalIngredients, setOptionalIngredients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        // Load all pizzas when the component mounts
        axios.get('/api/ingredients/menu')
            .then(response => {
                setPizzas(response.data);
            })
            .catch(error => {
                console.error("Error loading pizzas:", error);
            });
    }, []);

    const handleOrderClick = (pizza) => {
        setSelectedPizza(pizza);

        // Temporary test data
        const testIngredients = [
            { id: 1, name: "Champignons", price: 1.50 },
            { id: 2, name: "Pepperoni", price: 2.00 },
            { id: 3, name: "Olives", price: 1.00 }
        ];
        setOptionalIngredients(testIngredients);
        console.log("Optional Ingredients set:", testIngredients); // Debug log
        setIsModalOpen(true);

        // Keep this commented until the proxy issue is resolved
        /*
        axios.get(`/api/ingredients/optional/${pizza.id}`)
            .then(response => {
                setOptionalIngredients(response.data);
                console.log("Optional Ingredients from API:", response.data); // Debug log
                setIsModalOpen(true);
            })
            .catch(error => {
                console.error(`Error loading optional ingredients for pizza ${pizza.id}:`, error);
                setOptionalIngredients([]);
                setIsModalOpen(true);
            });
        */
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedPizza(null);
        setOptionalIngredients([]);
    };

    const handleAddToCart = (pizza, selectedIngredients) => {
        // Implement the logic to add to cart here
        console.log("Pizza added to cart:", pizza, "with ingredients:", selectedIngredients);
        handleCloseModal();
    };

    return (
        <div className="pizza-list">
            {pizzas.map(pizza => (
                <div key={pizza.id} className="pizza-card">
                    <h3>{pizza.name}</h3>
                    <p>{pizza.description}</p>
                    <p>Price: €{pizza.price}</p>
                    <button onClick={() => handleOrderClick(pizza)}>Order</button>
                </div>
            ))}

            {isModalOpen && selectedPizza && (
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

export default PizzaList;