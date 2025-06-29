import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

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
    timeline: "",
    status: "Active",
    description: "",
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name || "",
        client: editingProject.client || "",
        expectedIncome: editingProject.expectedIncome?.toString() || "",
        actualIncome: editingProject.actualIncome?.toString() || "",
        date: editingProject.date
          ? new Date(editingProject.date).toISOString().split("T")[0]
          : "",
        timeline: editingProject.timeline || "",
        status: editingProject.status || "Active",
        description: editingProject.description || "",
      });
    } else {
      setFormData({
        name: "",
        client: "",
        expectedIncome: "",
        actualIncome: "",
        date: "",
        timeline: "",
        status: "Active",
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
      date: formData.date,
      timeline: formData.timeline,
      status: formData.status,
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
      date: "",
      timeline: "",
      status: "Active",
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

          {/* 🟢 New: Timeline */}
          {/* <div>
            <Label htmlFor="timeline">Timeline</Label>
            <Input
              id="timeline"
              placeholder="e.g., 2025-01-22 to 2025-05-28"
              value={formData.timeline}
              onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
              required
            />
          </div> */}

          {/* 🟢 New: Status */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
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
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 dark:text-foreground">
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
