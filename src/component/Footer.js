import React from 'react';

function Footer() {
    return (
        <footer className="App-footer">
            <div className="App-buttons">
                <button className="btn-red">LIVRAISON</button>
                <button className="btn-blue">A EMPORTER</button>
            </div>
            <div className="App-payment">
                <p>Payez en toute sécurité avec</p>
                <div className="App-payment-icons">
                    <img  alt="Master Card" />
                    <img  alt="Visa" />
                    <img  alt="Maestro" />
                    <img  alt="Edenred" />
                    <img alt="PayPal" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;