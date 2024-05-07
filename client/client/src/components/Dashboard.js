// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [instanceCount, setInstanceCount] = useState(0);
    const [databaseCount, setDatabaseCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Fetch data from backend API to get dashboard information
        axios.get('/api/dashboard')
            .then(response => {
                const { instanceCount, databaseCount, userCount } = response.data;
                setInstanceCount(instanceCount);
                setDatabaseCount(databaseCount);
                setUserCount(userCount);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div>
                <h3>Connected MongoDB Instances: {instanceCount}</h3>
                <h3>Total Databases: {databaseCount}</h3>
                <h3>Total Users: {userCount}</h3>
            </div>
        </div>
    );
}

export default Dashboard;
