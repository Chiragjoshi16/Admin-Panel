// databaseRoutes.js

const express = require('express');
const router = express.Router();
const { withMongoClient } = require('../middleware/withMongoClient');

router.use(withMongoClient);

// Example controller functions for database operations
// Replace these with your actual controller functions
const {
    createDatabase,
    removeDatabase,
    addEntryToDatabase
} = require('../controllers/databaseController');

router.post('/create', (req, res) => {
    createDatabase(req.body.databaseName)
        .then(result => res.status(201).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
});

router.delete('/remove/:id', (req, res) => {
    removeDatabase(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(500).json({ message: error.message }));
        });

        // Route to add an entry to a database
        router.post('/add-entry', (req, res) => {
            // Example logic to add an entry to a database
            // replace this with your actual logic
            addEntryToDatabase(req.body.databaseId, req.body.entry)
                .then(result => res.status(201).json(result))
                .catch(error => res.status(500).json({ message: error.message }));
        });
        
        module.exports = router;
        