// instanceRoutes.js

const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017';

// Middleware to handle MongoDB connections
const withMongoClient = async (req, res, next) => {
    let client;
    try {
        // Connect to MongoDB instance
        client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        req.mongoClient = client; // Attach MongoDB client to request object
        next(); // Proceed to route handler
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        if (client) await client.close(); // Close connection if there's an error
        res.status(500).json({ message: 'Failed to connect to MongoDB' });
    }
};

// Route to add MongoDB instance
router.post('/add', withMongoClient, async (req, res) => {
    const { host, port } = req.body;
    const client = req.mongoClient;

    try {
        // Perform MongoDB operations
        const databasesList = await client.db().admin().listDatabases();
        console.log(databasesList);

        res.status(200).json({ message: 'MongoDB instance added successfully' });
    } catch (error) {
        console.error('Error adding MongoDB instance:', error);
        res.status(500).json({ message: 'Failed to add MongoDB instance' });
    } finally {
        await client.close(); // Close MongoDB connection after operation
    }
});

// Route to list connected MongoDB instances
router.get('/list', withMongoClient, async (req, res) => {
    const client = req.mongoClient;

    try {
        // Perform MongoDB operations
        // Example: Retrieve instance details from database or perform MongoDB list operation

        res.status(200).json({ instances: [] }); // Placeholder response
    } catch (error) {
        console.error('Error listing MongoDB instances:', error);
        res.status(500).json({ message: 'Failed to list MongoDB instances' });
    } finally {
        await client.close(); // Close MongoDB connection after operation
    }
});

module.exports = router;
