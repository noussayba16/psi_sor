import React from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/Cart.css';

const Cart = () => {
    const { state, dispatch } = useCart();
    const navigate = useNavigate();

    const handleQuantityChange = (pizzaId, newQuantity) => {
        if (newQuantity <= 0) {
            dispatch({
                type: 'REMOVE_ITEM',
                payload: { pizzaId }
            });
        } else {
            dispatch({
                type: 'UPDATE_QUANTITY',
                payload: { pizzaId, quantity: newQuantity }
            });
        }
    };

    const handleRemoveIngredient = (pizzaId, ingredientId) => {
        dispatch({
            type: 'REMOVE_INGREDIENT',
            payload: { pizzaId, ingredientId }
        });
    };

    const handleClearCart = () => {
        if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
            dispatch({ type: 'CLEAR_CART' });
        }
    };

    const handleCheckout = () => {
        // Préparer les données de commande pour l'API
        const orderData = {
            items: state.items.map(item => ({
                pizzaId: item.pizzaId,
                quantity: item.quantity,
                additionalIngredients: item.additionalIngredients.map(ing => ({
                    ingredientId: ing.id,
                    quantity: ing.quantity || 1
                }))
            }))
        };

        // Envoyer la commande au serveur
        axios.post('/api/orders', orderData)
            .then(response => {
                alert('Votre commande a été passée avec succès !');
                dispatch({ type: 'CLEAR_CART' });
                navigate('/order-confirmation', { state: { orderId: response.data.id } });
            })
            .catch(error => {
                console.error('Error submitting order', error);
                alert('Une erreur est survenue lors de la commande. Veuillez réessayer.');
            });
    };

    if (state.items.length === 0) {
        return (
            <div className="cart-container empty-cart">
                <h1>Votre Panier</h1>
                <p>Votre panier est vide</p>
                <button
                    className="continue-shopping-button"
                    onClick={() => navigate('/menu')}
                >
                    Continuer vos achats
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h1>Votre Panier</h1>

            <div className="cart-items">
                {state.items.map(item => (
                    <div key={item.pizzaId} className="cart-item">
                        <img src={`/${item.photoUrl}`} alt={item.name} className="cart-item-image" />

                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>Prix unitaire: €{item.price}</p>

                            <div className="quantity-control">
                                <button onClick={() => handleQuantityChange(item.pizzaId, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleQuantityChange(item.pizzaId, item.quantity + 1)}>+</button>
                            </div>

                            {item.additionalIngredients.length > 0 && (
                                <div className="additional-ingredients">
                                    <h4>Ingrédients supplémentaires:</h4>
                                    <ul>
                                        {item.additionalIngredients.map(ing => (
                                            <li key={ing.id}>
                                                {ing.name} (+€{ing.price})
                                                <button
                                                    className="remove-ingredient"
                                                    onClick={() => handleRemoveIngredient(item.pizzaId, ing.id)}
                                                >
                                                    ×
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <p className="item-subtotal">
                                Sous-total: €{(
                                (item.price +
                                    item.additionalIngredients.reduce((sum, ing) => sum + ing.price, 0)) *
                                item.quantity
                            ).toFixed(2)}
                            </p>
                        </div>

                        <button
                            className="remove-item"
                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: { pizzaId: item.pizzaId } })}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>

            <div className="cart-summary">
                <h2>Récapitulatif</h2>
                <p className="total-price">Total: €{state.totalPrice.toFixed(2)}</p>

                <div className="cart-actions">
                    <button className="clear-cart" onClick={handleClearCart}>
                        Vider le panier
                    </button>
                    <button className="checkout-button" onClick={handleCheckout}>
                        Passer commande
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;