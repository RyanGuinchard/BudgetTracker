require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./utils/db');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT

// Middleware
app.use(express.json());
app.use(cors());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Routes

app.use('/api', authRoutes);
app.get('/api',(req, res) => {
    res.json({ message: 'Hello from server!' });
});


// Server start
const startServer = async () => {
    try {
        await db.connectDb();
        console.log('db connection established');

        app.listen(PORT, ()=> {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server', err);
        process.exit(1);
    }

    
}
startServer();