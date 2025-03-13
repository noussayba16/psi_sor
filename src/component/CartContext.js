import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const initialState = {
    items: [],
    totalPrice: 0,
};

function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.items.findIndex(
                item => item.pizzaId === action.payload.pizzaId
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1,
                };

                return {
                    ...state,
                    items: updatedItems,
                    totalPrice: calculateTotalPrice(updatedItems),
                };
            } else {
                const newItem = {
                    ...action.payload,
                    quantity: 1,
                    additionalIngredients: [],
                };

                return {
                    ...state,
                    items: [...state.items, newItem],
                    totalPrice: calculateTotalPrice([...state.items, newItem]),
                };
            }
        }

        case 'REMOVE_ITEM': {
            const updatedItems = state.items.filter(
                item => item.pizzaId !== action.payload.pizzaId
            );

            return {
                ...state,
                items: updatedItems,
                totalPrice: calculateTotalPrice(updatedItems),
            };
        }

        case 'UPDATE_QUANTITY': {
            const updatedItems = state.items.map(item =>
                item.pizzaId === action.payload.pizzaId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );

            return {
                ...state,
                items: updatedItems,
                totalPrice: calculateTotalPrice(updatedItems),
            };
        }

        case 'ADD_INGREDIENT': {
            const updatedItems = state.items.map(item => {
                if (item.pizzaId === action.payload.pizzaId) {
                    const existingIngredient = item.additionalIngredients.find(
                        ing => ing.id === action.payload.ingredient.id
                    );

                    if (existingIngredient) {
                        return {
                            ...item,
                            additionalIngredients: item.additionalIngredients.map(ing =>
                                ing.id === action.payload.ingredient.id
                                    ? { ...ing, quantity: ing.quantity + 1 }
                                    : ing
                            )
                        };
                    } else {
                        return {
                            ...item,
                            additionalIngredients: [
                                ...item.additionalIngredients,
                                { ...action.payload.ingredient, quantity: 1 }
                            ]
                        };
                    }
                }
                return item;
            });

            return {
                ...state,
                items: updatedItems,
                totalPrice: calculateTotalPrice(updatedItems),
            };
        }

        case 'REMOVE_INGREDIENT': {
            const updatedItems = state.items.map(item => {
                if (item.pizzaId === action.payload.pizzaId) {
                    return {
                        ...item,
                        additionalIngredients: item.additionalIngredients.filter(
                            ing => ing.id !== action.payload.ingredientId
                        )
                    };
                }
                return item;
            });

            return {
                ...state,
                items: updatedItems,
                totalPrice: calculateTotalPrice(updatedItems),
            };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
}

function calculateTotalPrice(items) {
    return items.reduce((total, item) => {
        const pizzaPrice = item.price * item.quantity;
        const ingredientsPrice = item.additionalIngredients.reduce(
            (sum, ing) => sum + ing.price * ing.quantity,
            0
        );
        return total + pizzaPrice + ingredientsPrice;
    }, 0);
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            dispatch({ type: 'REPLACE_CART', payload: JSON.parse(savedCart) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state));
    }, [state]);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};