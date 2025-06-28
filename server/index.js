const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

// POST endpoint to receive new project data
app.post('/api/projects', (req, res) => {
  const newProject = req.body;
  console.log('📥 Received project:', newProject);

  // Simulate saving to DB (just log it)
  res.status(201).json({ message: 'Project received', project: newProject });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
