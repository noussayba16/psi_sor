import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';
import '../assets/Cart.css';

const Cart = () => {
    const { cartItems, removeFromCart, getCartTotal } = useCart();
    const cartTotal = getCartTotal();

    return (
        <div className="cart-container">
            <h1>Votre Panier</h1>

            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <p>Votre panier est vide</p>
                    <Link to="/menu" className="continue-shopping">Voir notre menu</Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="cart-item-details">
                                    <h2>{item.pizza.name}</h2>
                                    <p className="item-description">{item.pizza.description}</p>
                                    <p>Prix base: €{item.pizza.price.toFixed(2)}</p>

                                    {item.selectedIngredients.length > 0 && (
                                        <div className="selected-ingredients">
                                            <h3>Ingrédients ajoutés:</h3>
                                            <ul>
                                                {item.selectedIngredients.map((ing, i) => (
                                                    <li key={i}>
                                                        {ing.name} (+€{ing.price.toFixed(2)})
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <p className="item-total">Total pour cette pizza: €{item.totalPrice.toFixed(2)}</p>
                                </div>
                                <button
                                    className="remove-item"
                                    onClick={() => removeFromCart(index)}
                                >
                                    Supprimer
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h2>Récapitulatif</h2>
                        <div className="cart-total">
                            <span>Total:</span>
                            <span>€{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="cart-actions">
                            <Link to="/menu" className="continue-shopping">Continuer vos achats</Link>
                            <button className="checkout-button">Passer la commande</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;