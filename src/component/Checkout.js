import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import '../assets/Checkout.css';

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // État pour les données de l'utilisateur
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Structure modifiée pour inclure les informations client
            const orderData = {
                userId: null, // Pas d'utilisateur connecté
                customerInfo: {
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    address: userData.address
                },
                items: cartItems.map(item => ({
                    productId: item.pizza.id,
                    quantity: 1,
                    price: item.totalPrice,
                    ingredients: item.selectedIngredients.map(ing => ing.id)
                })),
                totalPrice: getCartTotal()
            };

            console.log('Sending order data:', JSON.stringify(orderData));

            // Envoi de la requête
            const response = await fetch('http://localhost:8080/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error:', errorText);
                throw new Error('Erreur lors de la création de la commande');
            }

            const result = await response.json();
            console.log('Order created successfully:', result);

            // Afficher confirmation et réinitialiser le panier
            setOrderPlaced(true);
            setOrderNumber(result.id);
            clearCart();

            // Rediriger vers une page de confirmation après 3 secondes
            setTimeout(() => {
                navigate('/order-confirmation', {
                    state: {
                        orderNumber: result.id,
                        totalAmount: getCartTotal()
                    }
                });
            }, 3000);

        } catch (err) {
            setError(err.message);
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0 && !orderPlaced) {
        return (
            <div className="checkout-container empty-cart">
                <h2>Votre panier est vide</h2>
                <button onClick={() => navigate('/menu')} className="return-button">
                    Retourner au menu
                </button>
            </div>
        );
    }

    if (orderPlaced) {
        return (
            <div className="checkout-container order-success">
                <div className="success-animation">
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                        <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                    </svg>
                </div>
                <h2>Commande passée avec succès!</h2>
                <p>Votre numéro de commande est: <strong>#{orderNumber}</strong></p>
                <p>Vous allez être redirigé vers la page de confirmation...</p>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Finaliser votre commande</h2>

            <div className="checkout-summary">
                <h3>Récapitulatif de la commande</h3>
                <ul className="order-items">
                    {cartItems.map((item, index) => (
                        <li key={index} className="order-item">
                            <div className="item-details">
                                <span className="item-name">{item.pizza.name}</span>
                                <span className="item-price">{item.totalPrice.toFixed(2)} €</span>
                            </div>
                            {item.selectedIngredients.length > 0 && (
                                <ul className="item-ingredients">
                                    {item.selectedIngredients.map((ing, idx) => (
                                        <li key={idx}>{ing.name} (+{ing.price.toFixed(2)} €)</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
                <div className="total-amount">
                    <span>Total:</span>
                    <span className="amount">{getCartTotal().toFixed(2)} €</span>
                </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="checkout-form">
                <h3>Informations de livraison</h3>
                <div className="form-group">
                    <label htmlFor="name">Nom complet</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Téléphone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={userData.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Adresse de livraison</label>
                    <textarea
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="checkout-actions">
                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate('/cart')}
                    >
                        Retour au panier
                    </button>
                    <button
                        type="submit"
                        className="confirm-button"
                        disabled={loading}
                    >
                        {loading ? 'Traitement en cours...' : 'Confirmer la commande'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Checkout;