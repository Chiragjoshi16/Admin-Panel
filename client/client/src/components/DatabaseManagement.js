// src/components/DatabaseManagement.js
import React, { useState } from 'react';
import axios from 'axios';

const DatabaseManagement = () => {
    const [newDatabaseName, setNewDatabaseName] = useState('');
    const [databases, setDatabases] = useState([]);

    const handleCreateDatabase = () => {
        // Send request to backend API to create a new database
        axios.post('/api/databases', { name: newDatabaseName })
            .then(response => {
                setDatabases(prevDatabases => [...prevDatabases, response.data]);
                setNewDatabaseName('');
            })
            .catch(error => {
                console.error('Error creating database:', error);
            });
    };

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
        <div className="database-management">
            <h2>Database Management</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter database name"
                    value={newDatabaseName}
                    onChange={(e) => setNewDatabaseName(e.target.value)}
                />
                <button onClick={handleCreateDatabase}>Create Database</button>
            </div>
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

export default DatabaseManagement;
