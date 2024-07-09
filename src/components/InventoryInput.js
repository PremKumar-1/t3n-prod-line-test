import React, { useState } from 'react';
import axios from 'axios';

const InventoryInput = () => {
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/inventory/', {
                product_name: product,
                quantity: parseFloat(quantity), // Ensure quantity is parsed as float
            });
            alert('Inventory data saved successfully!');
            setProduct('');
            setQuantity('');
        } catch (error) {
            alert('Error saving inventory data!');
            console.error('Error:', error);
        }
    };

    return (
        <div className="inventory-input">
            <h2>Add Inventory</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Name:
                    <input
                        type="text"
                        value={product}
                        onChange={(e) => setProduct(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};

export default InventoryInput;
