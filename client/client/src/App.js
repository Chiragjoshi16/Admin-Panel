// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import DatabaseManagement from './components/DatabaseManagement';
import './styles/dashboard.css';
import './styles/userManagement.css';
import './styles/databaseManagement.css';

const App = () => {
    return (
        <div>
            <h1>Admin Panel</h1>
            <Dashboard />
            <UserManagement />
            <DatabaseManagement />
        </div>
    );
}

export default App;
