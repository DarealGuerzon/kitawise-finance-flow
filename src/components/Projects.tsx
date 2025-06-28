
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, DollarSign, User, TrendingUp } from "lucide-react";
import { AddProjectModal } from "@/components/AddProjectModal";

const mockProjects = [
  {
    id: 1,
    name: "Website Design",
    client: "ABC Corp",
    expectedIncome: 50000,
    actualIncome: 45000,
    timeline: "2024-01-15 to 2024-02-28",
    status: "completed",
    profitability: 90
  },
  {
    id: 2,
    name: "Mobile App Development",
    client: "XYZ Ltd",
    expectedIncome: 75000,
    actualIncome: 80000,
    timeline: "2024-02-01 to 2024-04-30",
    status: "completed",
    profitability: 107
  },
  {
    id: 3,
    name: "Logo Design",
    client: "StartupCo",
    expectedIncome: 20000,
    actualIncome: 15000,
    timeline: "2024-03-01 to 2024-03-15",
    status: "completed",
    profitability: 75
  },
  {
    id: 4,
    name: "E-commerce Platform",
    client: "RetailMax",
    expectedIncome: 120000,
    actualIncome: 0,
    timeline: "2024-06-01 to 2024-08-31",
    status: "active",
    profitability: 0
  },
];

export function Projects() {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);

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
        {mockProjects.map((project) => (
          <Card key={project.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg text-gray-900">{project.name}</CardTitle>
                <Badge className={getStatusColor(project.status)}>
                  {project.status}
                </Badge>
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
                  <span className="font-medium text-gray-900">₱{project.expectedIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Actual Income:</span>
                  <span className="font-medium text-gray-900">₱{project.actualIncome.toLocaleString()}</span>
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
        onClose={() => setIsAddProjectOpen(false)}
      />
    </div>
  );
}
