import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import JarCount from './JarCount';
import InputInventory from './InputInventory';
import Sidebar from './SideBar';

const App = () => {
    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ marginLeft: '200px', padding: '20px', width: '100%' }}>
                    <Routes>
                        <Route path="/" element={<JarCount />} />
                        <Route path="/input" element={<InputInventory />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
