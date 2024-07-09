import React, { useEffect, useState } from 'react';
import './JarCount.css';

const Dashboard = () => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [jarCount, setJarCount] = useState({ shift1: 0, shift2: 0, total: 0 });
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        const fetchJarCount = async () => {
            try {
                const response = await fetch(`http://3.129.44.247:8000/api/jarcounts/?date=${date}`);
                const data = await response.json();
                console.log("Jar Count Data:", data); // Log fetched data
                let shift1 = 0;
                let shift2 = 0;
                let total = 0;
                data.forEach(item => {
                    if (item.shift === 'day') {
                        shift1 += item.count;
                    } else if (item.shift === 'night') {
                        shift2 += item.count;
                    }
                    total += item.count;
                });
                setJarCount({ shift1, shift2, total });
            } catch (error) {
                console.error("Error fetching jar count:", error); // Log any errors
            }
        };

        const fetchInventory = async () => {
            try {
                const response = await fetch(`http://3.129.44.247:8000/api/inventories/`);
                const data = await response.json();
                console.log("Inventory Data:", data); // Log fetched data
                setInventory(data);
            } catch (error) {
                console.error("Error fetching inventory:", error); // Log any errors
            }
        };

        fetchJarCount();
        fetchInventory();
    }, [date]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <div className="dashboard">
            <h1>Jar Counter Dashboard</h1>
            <label htmlFor="date-picker">Select Date:</label>
            <input 
                type="date" 
                id="date-picker" 
                value={date}
                onChange={handleDateChange} 
            />
            <h2>Main Room Jar Count (RITA)</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Shift</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Shift 1</td>
                        <td>{jarCount.shift1}</td>
                    </tr>
                    <tr>
                        <td>Shift 2</td>
                        <td>{jarCount.shift2}</td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td>{jarCount.total}</td>
                    </tr>
                </tbody>
            </table>
            <h2>Inventory</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item, index) => (
                        <tr key={index}> {/* Add a unique key prop */}
                            <td>{item.product_name ? item.product_name.trim() : 'Unknown'}</td>
                            <td>{item.quantity.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
