
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

const projects = [];

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON bodies

// POST endpoint to receive new project data
app.post('/api/projects', (req, res) => {
  const newProject = {
    ...req.body,
    id: Date.now(), // simple unique ID
    actualIncome: 0,
    status: 'active',
    profitability: 0
  };

   projects.push(newProject); // ✅ add to memory

  console.log('📥 Project added:', newProject);
  res.status(201).json({ message: 'Project saved', project: newProject });
});

// GET /api/projects - Fetch all projects
app.get('/api/projects', (req, res) => {
  res.json(projects); // ✅ return current list
});

app.delete('/api/projects/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Not found" });

  const deleted = projects.splice(index, 1)[0];
  console.log("🗑️ Deleted project:", deleted);
  res.json({ message: "Deleted", project: deleted });
});

app.put('/api/projects/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = projects.findIndex(p => p.id === id);

  if (index === -1) return res.status(404).json({ message: "Project not found" });

  // Update fields
  projects[index] = { ...projects[index], ...req.body };
  console.log("✏️ Project updated:", projects[index]);

  res.json({ message: "Updated", project: projects[index] });
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
