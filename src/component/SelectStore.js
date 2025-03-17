import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/SelectStore.css';

const SelectStore = () => {
    const [selectedStore, setSelectedStore] = useState('');
    const navigate = useNavigate();

    const handleStoreSelect = (e) => {
        setSelectedStore(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedStore) {
            navigate('/menu', { state: { store: selectedStore } });
        }
    };

    return (
        <div className="select-store-container">
            <h2>Choisissez le magasin le plus proche</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="store">Magasin</label>
                    <select id="store" value={selectedStore} onChange={handleStoreSelect} required>
                        <option value="">Sélectionnez un magasin</option>
                        <option value="store1">Rive droite </option>
                        <option value="store2">Rive gauche </option>
                    </select>
                </div>
                <button type="submit" className="confirm-button">Confirmer</button>
            </form>
        </div>
    );
};

export default SelectStore;