import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, DollarSign, User, TrendingUp, Pencil, Trash2 } from "lucide-react";
import { AddProjectModal } from "@/components/AddProjectModal";
import { fetchProjects, addProject, updateProject, deleteProject } from "@/lib/api";

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  // Fetch projects on mount
  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProfitabilityColor = (profitability: number) => {
    if (profitability >= 100) return "text-green-600";
    if (profitability >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  // Add project using API
  const handleAddProject = async (newProject: any) => {
    const created = await addProject(newProject);
    setProjects(prev => [...prev, created]);
  };

  // Update project using API
  const handleUpdateProject = async (updatedProject: any) => {
    const updated = await updateProject(updatedProject._id || updatedProject.id, updatedProject);
    setProjects(prev => prev.map(project => (project._id === updated._id ? updated : project)));
  };

  // Delete project using API
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;
    await deleteProject(id);
    setProjects(prev => prev.filter(project => project._id !== id));
  };

  const handleEdit = (project: any) => {
    setEditingProject(project);
    setIsAddProjectOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Track and manage your project-based income</p>
        </div>
        <Button 
          onClick={() => setIsAddProjectOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-gray-900">{project.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(project)}>
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(project._id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="h-4 w-4" />
                <span>{project.client}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{project.timeline}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Expected Income:</span>
                  <span className="font-medium text-gray-900">₱{project.expectedIncome?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Actual Income:</span>
                  <span className="font-medium text-gray-900">₱{project.actualIncome?.toLocaleString()}</span>
                </div>
              </div>

              {project.status === "completed" && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">Profitability:</span>
                  </div>
                  <span className={`font-bold ${getProfitabilityColor(project.profitability)}`}>
                    {project.profitability}%
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <AddProjectModal 
        isOpen={isAddProjectOpen}
        onClose={() => {
          setIsAddProjectOpen(false);
          setEditingProject(null);
        }}
        onAddProject={handleAddProject}
        onUpdateProject={handleUpdateProject}
        editingProject={editingProject}
      />
    </div>
  );
}