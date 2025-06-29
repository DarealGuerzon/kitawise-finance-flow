import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject?: (project: any) => void;
  onUpdateProject?: (project: any) => void;
  editingProject?: any;
}

const projectStatuses = [
  { label: "Not Started", value: "notStarted" },
  { label: "In Progress", value: "inProgress" },
  { label: "Completed", value: "completed" },
];

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
    date: "", // formatted as yyyy-MM-dd
    description: "",
    status: "notStarted",
  });

  useEffect(() => {
    if (editingProject) {
      setFormData({
        name: editingProject.name || "",
        client: editingProject.client || "",
        expectedIncome: editingProject.expectedIncome?.toString() || "",
        actualIncome: editingProject.actualIncome?.toString() || "",
        date: editingProject.date?.split("T")[0] || "",
        description: editingProject.description || "",
        status: editingProject.status || "notStarted",
      });
    // } else {
    //   setFormData({
    //     name: "",
    //     client: "",
    //     expectedIncome: "",
    //     actualIncome: "",
    //     date: "",
    //     description: "",
    //     status: "notStarted",
    //   });
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
      description: formData.description,
      status: formData.status,
    };

    if (editingProject && onUpdateProject) {
      onUpdateProject(projectPayload);
      toast({
        title: "Project Updated",
        description: `${formData.name} has been updated.`,
      });
    } else if (onAddProject) {
      onAddProject(projectPayload);
      toast({
        title: "Project Added",
        description: `${formData.name} has been added.`,
      });
    }

    setFormData({
      name: "",
      client: "",
      expectedIncome: "",
      actualIncome: "",
      date: "",
      description: "",
      status: "notStarted",
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
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {projectStatuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Custom Date Picker using Calendar and Popover */}
          <div>
            <Label htmlFor="date">Project Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date ? format(new Date(formData.date), "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.date ? new Date(formData.date) : undefined}
                  onSelect={(date) =>
                    setFormData({
                      ...formData,
                      date: date ? format(date, "yyyy-MM-dd") : "",
                    })
                  }
                />
              </PopoverContent>
            </Popover>
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
