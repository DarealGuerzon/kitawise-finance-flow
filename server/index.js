const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
PORT=4000;

// Middleware
app.use(cors({
  origin: 'https://kitawise-finance-flow.vercel.app',
  credentials: true, // Only if you use cookies/auth
}));
app.use(express.json());

// MongoDB connection
console.log('MONGODB_URI:', process.env.MONGODB_URI); // Debug
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const goalsRoutes = require('./routes/goals');
const projectsRoutes = require('./routes/projects');
const expensesRouter = require('./routes/expenses')

app.use('/api/goals', goalsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/expenses',expensesRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
