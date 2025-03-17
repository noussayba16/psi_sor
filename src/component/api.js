// src/services/api.js
export const submitOrder = async (cartItems, userId = 1) => {
    // Transform cart items to match your OrderRequestDTO format
    const orderRequest = {
        userId: userId,
        items: cartItems.map(item => ({
            productId: item.pizza.id,
            quantity: 1,
            price: item.totalPrice,
            // Include ingredients if your backend supports it
            ingredients: item.selectedIngredients.map(ing => ing.id)
        })),
        totalPrice: cartItems.reduce((total, item) => total + item.totalPrice, 0)
    };

    try {
        const response = await fetch('http://localhost:8080/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderRequest)
        });

        if (!response.ok) {
            throw new Error('Failed to create order');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error;
    }
};