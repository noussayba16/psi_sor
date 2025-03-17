import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import '../assets/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, getCartTotal } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="cart-container empty-cart">
                <h2>Votre panier est vide</h2>
                <p>Retournez au menu pour ajouter des pizzas à votre panier</p>
                <button onClick={() => navigate('/menu')} className="return-button">
                    Voir le menu
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2>Votre Panier</h2>
            <div className="cart-items">
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item">
                        <div className="item-info">
                            <h3>{item.pizza.name}</h3>
                            <p className="item-price">Prix de base: {item.pizza.price.toFixed(2)} €</p>

                            {item.selectedIngredients.length > 0 && (
                                <div className="item-ingredients">
                                    <p>Ingrédients supplémentaires:</p>
                                    <ul>
                                        {item.selectedIngredients.map((ing, idx) => (
                                            <li key={idx}>{ing.name} (+{ing.price.toFixed(2)} €)</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <p className="item-total">Total: <strong>{item.totalPrice.toFixed(2)} €</strong></p>
                        </div>
                        <button
                            className="remove-button"
                            onClick={() => removeFromCart(index)}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <div className="cart-total">
                    <span>Total du panier:</span>
                    <span className="total-amount">{getCartTotal().toFixed(2)} €</span>
                </div>

                <div className="cart-actions">
                    <button
                        className="continue-shopping"
                        onClick={() => navigate('/menu')}
                    >
                        Continuer les achats
                    </button>
                    <button
                        className="checkout-button"
                        onClick={() => navigate('/checkout')}
                    >
                        Passer la commande
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;