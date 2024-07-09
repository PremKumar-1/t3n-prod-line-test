// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ width: '200px', height: '100vh', backgroundColor: '#f8f9fa', padding: '10px' }}>
            <h3>Menu</h3>
            <ul style={{ listStyleType: 'none', padding: '0' }}>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/input">Input Inventory</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
