import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Ajouter un article au panier
    const addToCart = (pizza, selectedIngredients) => {
        // Calculer le prix total pour cette pizza avec ingrédients
        const ingredientsTotalPrice = selectedIngredients.reduce((total, ing) => total + ing.price, 0);
        const totalPrice = pizza.price + ingredientsTotalPrice;

        // Créer l'objet de l'article
        const cartItem = {
            pizza: pizza,
            selectedIngredients: selectedIngredients,
            totalPrice: totalPrice
        };

        setCartItems(prevItems => [...prevItems, cartItem]);
    };

    // Supprimer un article du panier
    const removeFromCart = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);
    };

    // Calculer le total du panier
    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + item.totalPrice, 0);
    };

    // Vider le panier
    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                getCartTotal,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;