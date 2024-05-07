const express = require('express');
const bcrypt = require('bcrypt');
const { requireAuth } = require('../middleware/authMiddleware');
const { ObjectId } = require('mongodb');
const { createUser, loginUser } = require('../controllers/userController');
const { withMongoClient } = require('../middleware/withMongoClient');

const router = express.Router();

// Middleware to connect to MongoDB client
router.use(withMongoClient);
router.use(requireAuth);

// Route to create a new user
router.post('/create', requireAuth, async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await req.mongoClient.db().collection('users').findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = {
            username,
            email,
            password: hashedPassword
        };

        // Insert the new user document into the database
        await req.mongoClient.db().collection('users').insertOne(newUser);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// Route to change user's password
router.put('/change-password/:id', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { newPassword } = req.body;

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        await req.mongoClient.db().collection('users').updateOne({ _id: ObjectId(id) }, { $set: { password: hashedPassword } });

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password' });
    }
});

// Route to remove a user
router.delete('/remove/:id', requireAuth, async (req, res) => {
    const { id } = req.params;

    try {
        // Remove the user from the database
        await req.mongoClient.db().collection('users').deleteOne({ _id: ObjectId(id) });

        res.status(200).json({ message: 'User removed successfully' });
    } catch (error) {
        console.error('Error removing user:', error);
        res.status(500).json({ message: 'Failed to remove user' });
    }
});

// Route to revoke user access to a specific database
router.put('/revoke-access/:userId/:dbName', requireAuth, async (req, res) => {
    const { userId, dbName } = req.params;

    try {
        // Your logic to revoke user access to a specific database goes here

        res.status(200).json({ message: 'User access revoked successfully' });
    } catch (error) {
        console.error('Error revoking user access:', error);
        res.status(500).json({ message: 'Failed to revoke user access' });
    }
});

// Route to assign a new user to a specific database
router.put('/assign-database/:userId/:dbName', requireAuth, async (req, res) => {
    const { userId, dbName } = req.params;

    try {
        // Your logic to assign a new user to a specific database goes here

        res.status(200).json({ message: 'User assigned to database successfully' });
    } catch (error) {
        console.error('Error assigning user to database:', error);
        res.status(500).json({ message: 'Failed to assign user to database' });
    }
});

// Route to handle user signup
router.post('/signup', createUser);

// Route to handle user login
router.post('/login', loginUser);

module.exports = router;
