import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Allow the app to accept JSON data in the body of requests
app.use(express.json());

// A simple root route for testing if the server is up
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount the imported routes
// app.use('/api/products', productRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/orders', orderRoutes);

// Custom middleware for handling 404 Not Found errors
app.use(notFound);

// Custom middleware for handling other errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// This is the crucial part that starts the server and keeps it running
app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);