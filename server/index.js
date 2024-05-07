// index.js

const express = require('express');
const mongoose = require('mongoose');
const { requireAuth } = require('./middleware/authMiddleware');
const app = express();

// Middleware
app.use(express.json());
app.use(requireAuth);

// Connect to MongoDB
const mongoURI = 'mongodb://localhost:27017/adminDB'; // Replace with your connection string
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use(requireAuth); // Moved requireAuth middleware here

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/instances', require('./routes/instanceRoutes'));
app.use('/api/databases', require('./routes/databaseRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
