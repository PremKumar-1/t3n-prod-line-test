import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './JarCount.css';

const JarCount = () => {
    const [counts, setCounts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('http://127.0.0.1:8000/api/jarcounts/');
                if (Array.isArray(result.data)) {
                    setCounts(result.data);
                } else {
                    throw new Error('Fetched data is not an array');
                }
            } catch (error) {
                setError(error);
                console.error("There was an error fetching the data!", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderTableData = () => {
        if (!Array.isArray(counts)) return null;

        const filteredData = counts.filter(count => count.timestamp.split('T')[0] === selectedDate);
        const dayShiftData = filteredData.filter(count => count.shift === 'day');
        const nightShiftData = filteredData.filter(count => count.shift === 'night');

        const dayShiftTotal = dayShiftData.reduce((sum, record) => sum + record.count, 0);
        const nightShiftTotal = nightShiftData.reduce((sum, record) => sum + record.count, 0);
        const total = dayShiftTotal + nightShiftTotal;

        return (
            <>
                <tr>
                    <td>Shift 1</td>
                    <td>{dayShiftTotal}</td>
                    <td>0</td> {/* Assuming Reworked count is 0 */}
                </tr>
                <tr>
                    <td>Shift 2</td>
                    <td>{nightShiftTotal}</td>
                    <td>0</td> {/* Assuming Reworked count is 0 */}
                </tr>
                <tr>
                    <td>Total</td>
                    <td>{total}</td>
                    <td>0</td> {/* Assuming Reworked count is 0 */}
                </tr>
            </>
        );
    };

    if (loading) {
        return <p>Loading data...</p>;
    }

    return (
        <div className="jar-count">
            <label>
                Date:
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />
            </label>
            <h2>Main Room Jar Count (RITA)</h2>
            {error && <p>Error: {error.message}</p>}
            <table className="jar-count-table">
                <thead>
                    <tr>
                        <th>Shift</th>
                        <th>Completed</th>
                        <th>Reworked</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTableData()}
                </tbody>
            </table>
        </div>
    );
};

export default JarCount;
