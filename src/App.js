import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './component/Home';
import Menu from './component/Menu';
import { CartProvider } from './component/CartContext';

function App() {
    return (
        <CartProvider>
            <Router>
                <div className="App">
                    <Header />
                    <main className="App-main">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            {/* Add more routes here as needed */}
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;