import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="navigation">
            <ul>
                <li><Link to="/">Jar Count & Inventory</Link></li>
                <li><Link to="/add-inventory">Add Inventory</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;
