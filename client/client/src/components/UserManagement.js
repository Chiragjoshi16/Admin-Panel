// src/components/UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', email: '', password: '' });

    useEffect(() => {
        // Fetch list of users from the backend API
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }, []);

    const handleCreateUser = () => {
        // Send request to backend API to create a new user
        axios.post('/api/users', newUser)
            .then(response => {
                setUsers(prevUsers => [...prevUsers, response.data]);
                setNewUser({ username: '', email: '', password: '' });
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    const handleRemoveUser = (id) => {
        // Send request to backend API to remove the user
        axios.delete(`/api/users/${id}`)
            .then(response => {
                // Filter out the removed user from the state
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            })
            .catch(error => {
                console.error('Error removing user:', error);
            });
    };

    return (
        <div className="user-management">
            <h2>User Management</h2>
            <div>
                <h3>Create User</h3>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button onClick={handleCreateUser}>Create User</button>
            </div>
            <div>
                <h3>User List</h3>
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            {user.username} ({user.email})
                            <button onClick={() => handleRemoveUser(user._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UserManagement;
