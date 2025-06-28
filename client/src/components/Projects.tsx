import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EditProjectModal } from "@/components/EditProjectModal";
import { Plus, Calendar, DollarSign, User, TrendingUp } from "lucide-react";
import { AddProjectModal } from "@/components/AddProjectModal";
import { useEffect } from "react";
import { Trash2, Pencil } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function Projects() {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [filter, setFilter] = useState("all");

  const openEditModal = (project: any) => {
    setEditingProject(project);
    setIsEditOpen(true);
  };

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true;
    return project.type === filter;
  });

  const loadProjects = () => {
    fetch("http://localhost:3001/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err));
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/projects/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast({ title: "Project Deleted" });
        loadProjects(); // 🔁 refresh list
      } else {
        toast({ title: "Delete Failed", description: "Try again." });
      }
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  useEffect(() => {
    loadProjects();
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

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-4">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          All Projects
        </Button>
        <Button
          variant={filter === "project" ? "default" : "outline"}
          onClick={() => setFilter("project")}
          className={
            filter === "project" ? "bg-blue-600 hover:bg-blue-700" : ""
          }
        >
          Client Projects
        </Button>
        <Button
          variant={filter === "personal" ? "default" : "outline"}
          onClick={() => setFilter("personal")}
          className={
            filter === "personal" ? "bg-blue-600 hover:bg-blue-700" : ""
          }
        >
          Personal Projects
        </Button>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">
            Track and manage your project-based income
          </p>
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
        {filteredProjects.map((project) => (
          <Card
            key={project.id}
            className="bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-gray-900">
                  {project.name}
                </CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
                <button onClick={() => handleDelete(project.id)} title="Delete">
                  <Trash2 className="h-4 w-4 text-red-600 hover:text-red-800" />
                </button>
                <button onClick={() => openEditModal(project)} title="Edit">
                  <Pencil className="h-4 w-4 text-blue-600 hover:text-blue-800" />
                </button>
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
                  <span className="text-sm text-gray-600">
                    Expected Income:
                  </span>
                  <span className="font-medium text-gray-900">
                    ₱{project.expectedIncome.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Actual Income:</span>
                  <span className="font-medium text-gray-900">
                    ₱{project.actualIncome.toLocaleString()}
                  </span>
                </div>
              </div>

              {project.status === "completed" && (
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Profitability:
                    </span>
                  </div>
                  <span
                    className={`font-bold ${getProfitabilityColor(
                      project.profitability
                    )}`}
                  >
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
        onClose={() => setIsAddProjectOpen(false)}
        onProjectAdded={loadProjects} // ✅ reloads projects from backend
      />

      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={editingProject}
        onProjectUpdated={loadProjects}
      />
    </div>
  );
}
