import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/db.js';
import { notFound, errorHandler } from './src/middleware/errorMiddleware.js';
import userRoutes from './src/routes/userRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js'; 
import uploadRoutes from './src/routes/uploadRoutes.js';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import initCronJobs from './src/utils/cornJobs.js';
// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

io.on('connection', (socket) => {
    console.log('Pengguna baru terhubung:', socket.id);
    socket.on('disconnect', () => {
        console.log('Pengguna terputus:', socket.id);
    });
});

// Enable CORS biar bisa gitulah
app.use(cors());

// Allow the app to accept JSON data in the body of requests
app.use(express.json());

// A simple root route for testing if the server is up
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Mount the imported routes
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
// Custom middleware for handling 404 Not Found errors
app.use(notFound);

// Custom middleware for handling other errors
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// This is the crucial part that starts the server and keeps it running
httpServer.listen(
    PORT,
    ()=> {
        console.log(
            `Server & Socket.io running in ${process.env.NODE_ENV} mode on port ${PORT}`
        )
        initCronJobs();
    }
);