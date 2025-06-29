import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject?: (project: any) => void;
  onUpdateProject?: (project: any) => void;
  editingProject?: any;
}

export function AddProjectModal({
  isOpen,
  onClose,
  onAddProject,
  onUpdateProject,
  editingProject,
}: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    expectedIncome: "",
    actualIncome: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name || "",
        client: editingProject.client || "",
        expectedIncome: editingProject.expectedIncome?.toString() || "",
        actualIncome: editingProject.actualIncome?.toString() || "",
        // 🔄 CHANGED: Use `date` instead of timeline
        date: editingProject.date?.split("T")[0] || "", // format YYYY-MM-DD
        description: editingProject.description || "",
      });
    } else {
      setFormData({
        name: "",
        client: "",
        expectedIncome: "",
        actualIncome: "",
        date: "", // 🆕 ADDED
        description: "",
      });
    }
  }, [editingProject, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectPayload = {
      ...editingProject,
      name: formData.name,
      client: formData.client,
      expectedIncome: Number(formData.expectedIncome),
      actualIncome: Number(formData.actualIncome),
      // 🆕 ADDED
      date: formData.date,
      description: formData.description,
    };

    if (editingProject && onUpdateProject) {
      onUpdateProject(projectPayload);
    } else if (onAddProject) {
      onAddProject(projectPayload);
    }

    setFormData({
      name: "",
      client: "",
      expectedIncome: "",
      actualIncome: "",
      date: "", // 🆕 ADDED
      description: "",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{editingProject ? "Edit Project" : "Add New Project"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="expectedIncome">Expected Income (₱)</Label>
            <Input
              id="expectedIncome"
              type="number"
              value={formData.expectedIncome}
              onChange={(e) => setFormData({ ...formData, expectedIncome: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="actualIncome">Actual Income (₱)</Label>
            <Input
              id="actualIncome"
              type="number"
              value={formData.actualIncome}
              onChange={(e) => setFormData({ ...formData, actualIncome: e.target.value })}
              required
            />
          </div>

          {/* 🔄 CHANGED: Use a date picker instead of a free text timeline */}
          <div>
            <Label htmlFor="date">Project Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
