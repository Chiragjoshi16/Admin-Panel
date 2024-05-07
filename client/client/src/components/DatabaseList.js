// src/components/DatabaseList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DatabaseList = () => {
    const [databases, setDatabases] = useState([]);

    useEffect(() => {
        // Fetch list of databases from the backend API
        axios.get('/api/databases')
            .then(response => {
                setDatabases(response.data);
            })
            .catch(error => {
                console.error('Error fetching databases:', error);
            });
    }, []);

    const handleRemoveDatabase = (id) => {
        // Send request to backend API to remove the database
        axios.delete(`/api/databases/${id}`)
            .then(response => {
                // Filter out the removed database from the state
                setDatabases(prevDatabases => prevDatabases.filter(db => db._id !== id));
            })
            .catch(error => {
                console.error('Error removing database:', error);
            });
    };

    return (
        <div className="database-list">
            <h3>Database List</h3>
            <ul>
                {databases.map(database => (
                    <li key={database._id}>
                        {database.name}
                        <button onClick={() => handleRemoveDatabase(database._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DatabaseList;
