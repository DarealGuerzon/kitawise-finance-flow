import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, User, TrendingUp, Pencil, Trash2 } from "lucide-react";
import { AddProjectModal } from "@/components/AddProjectModal";
import { fetchProjects, addProject, updateProject, deleteProject } from "@/lib/api";

export function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getProfitabilityColor = (profitability: number) => {
    if (profitability >= 100) return "text-green-600 dark:text-green-400";
    if (profitability >= 80) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const handleAddProject = async (newProject: any) => {
    const created = await addProject(newProject);
    setProjects(prev => [...prev, created]);
  };

  const handleUpdateProject = async (updatedProject: any) => {
    const updated = await updateProject(updatedProject._id || updatedProject.id, updatedProject);
    setProjects(prev => prev.map(project => (project._id === updated._id ? updated : project)));
  };

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
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Track and manage your project-based income</p>
        </div>
        <Button onClick={() => setIsAddProjectOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card
            key={project._id}
            className="border border-border hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(project)}
                  >
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(project._id)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Client */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{project.client}</span>
              </div>

              {/* Timeline */}
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{project.timeline}</span>
              </div>

              {/* Income */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expected Income:</span>
                  <span className="font-medium">₱{project.expectedIncome?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Actual Income:</span>
                  <span className="font-medium">₱{project.actualIncome?.toLocaleString()}</span>
                </div>
              </div>

              {/* Profitability */}
              {project.status === "completed" && (
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Profitability:</span>
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

      {/* Modal */}
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
