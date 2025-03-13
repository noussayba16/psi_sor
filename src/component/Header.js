import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="App-header">
            <div className="App-brand">
                <img src="/pizza-logo.png" className="App-logo" alt="logo" />
                <span>Noussa's</span>
            </div>
            <nav className="App-nav">
                <ul>
                    <li><Link to="/menu">CARTE</Link></li>
                    <li><a href="#inscription">INSCRIPTION</a></li>
                    <li><a href="#connexion">CONNEXION</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;