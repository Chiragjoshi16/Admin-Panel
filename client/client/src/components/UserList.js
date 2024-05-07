// src/components/UserList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

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
        <div className="user-list">
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
    );
}

export default UserList;
