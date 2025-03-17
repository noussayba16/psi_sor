import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../assets/OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderNumber, totalAmount } = location.state || { orderNumber: '?', totalAmount: 0 };

    return (
        <div className="confirmation-container">
            <div className="confirmation-card">
                <div className="success-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                </div>

                <h1>Merci pour votre commande!</h1>
                <div className="order-details">
                    <p>Votre commande <strong>#{orderNumber}</strong> a été enregistrée avec succès.</p>
                    <p>Montant total: <strong>{totalAmount.toFixed(2)} €</strong></p>
                </div>

                <p className="delivery-info">
                    Vous recevrez un email de confirmation avec les détails de votre commande.
                    Votre pizza sera livrée dans environ 30-45 minutes.
                </p>

                <div className="confirmation-actions">
                    <button className="primary-button" onClick={() => navigate('/menu')}>
                        Retour au menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;