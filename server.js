const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');  // MongoDB credentials from config or environment variables

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Connecting to MongoDB Atlas (use environment variables for sensitive data)
mongoose.connect(config.mongoURI.production, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB Atlas connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Check if database connection is successful
mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
});

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware (built into Express)
app.use(express.json());

// Use routes
app.use('/', index);
app.use('/image', image);

// Define the port (use environment variable or fallback to 5000 for local dev)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});
