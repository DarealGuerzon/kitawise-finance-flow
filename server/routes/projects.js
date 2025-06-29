const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Project = require('../models/Project')

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// Add a new project
router.post('/', async (req, res) => {
  const newProject = new Project(req.body);
  await newProject.save();
  res.status(201).json(newProject);
});

// Delete a project
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

// Edit (update) a project
router.put('/:id', async (req, res) => {
  const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedProject) return res.status(404).json({ error: 'Project not found' });
  res.json(updatedProject);
});

module.exports = router;
