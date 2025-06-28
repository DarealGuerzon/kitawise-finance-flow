
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    client: "",
    expectedIncome: "",
    timeline: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically save to a database or state management
    console.log("New project:", formData);
    
    toast({
      title: "Project Added",
      description: `${formData.name} has been added successfully.`,
    });

    // Reset form and close modal
    setFormData({
      name: "",
      client: "",
      expectedIncome: "",
      timeline: "",
      description: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              value={formData.client}
              onChange={(e) => setFormData({...formData, client: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="expectedIncome">Expected Income (₱)</Label>
            <Input
              id="expectedIncome"
              type="number"
              value={formData.expectedIncome}
              onChange={(e) => setFormData({...formData, expectedIncome: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="timeline">Timeline</Label>
            <Input
              id="timeline"
              placeholder="e.g., 2024-07-01 to 2024-08-31"
              value={formData.timeline}
              onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Add Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
