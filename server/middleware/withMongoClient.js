// withMongoClient.js

const { MongoClient } = require('mongodb');

// MongoDB connection string
const mongoURI = 'mongodb://localhost:27017';

// Middleware function to provide MongoDB client to route handlers
const withMongoClient = async (req, res, next) => {
    let client;

    try {
        // Connect to MongoDB
        client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        // Pass MongoDB client to the request object
        req.mongoClient = client;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { withMongoClient };
