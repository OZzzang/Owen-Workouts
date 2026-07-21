require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

// express app
const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
     console.log(req.path, req.method);
     next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db and start the server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT);
        });
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1);
    }
};

startServer();