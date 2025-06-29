import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { toast } from "@/hooks/use-toast";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: any) => void;
  onUpdateGoal: (updatedGoal: any) => void;
  editingGoal?: any;
}

const categories = [
  "Savings",
  "Equipment",
  "Income",
  "Personal",
  "Business",
  "Investment",
];

export function AddGoalModal({
  isOpen,
  onClose,
  onAddGoal,
  onUpdateGoal,
  editingGoal,
}: AddGoalModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    category: "",
    status: "active", // 🆕 Added default status
  });

  // Prefill form when editingGoal changes
  useEffect(() => {
    if (editingGoal) {
      setFormData({
        title: editingGoal.title || "",
        description: editingGoal.description || "",
        targetAmount: editingGoal.targetAmount.toString(),
        currentAmount: editingGoal.currentAmount.toString(),
        deadline: editingGoal.deadline || "",
        category: editingGoal.category || "",
        status: editingGoal.status || "active", // 🆕 Fill status
      });
    } else {
      setFormData({
        title: "",
        description: "",
        targetAmount: "",
        currentAmount: "0",
        deadline: "",
        category: "",
        status: "active", // 🆕 Reset status
      });
    }
  }, [editingGoal, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const goalData = {
      ...formData,
      targetAmount: parseFloat(formData.targetAmount),
      currentAmount: parseFloat(formData.currentAmount),
      status: formData.status, // 🆕 Use selected status
    };

    try {
      if (editingGoal) {
        await onUpdateGoal({ ...goalData, _id: editingGoal._id });
        toast({
          title: "Goal Updated",
          description: `${goalData.title} has been updated successfully.`,
        });
      } else {
        await onAddGoal(goalData);
        toast({
          title: "Goal Created",
          description: `${goalData.title} goal has been set successfully.`,
        });
      }

      onClose();
      setFormData({
        title: "",
        description: "",
        targetAmount: "",
        currentAmount: "0",
        deadline: "",
        category: "",
        status: "active", // 🆕 Reset status
      });
    } catch (error) {
      console.error("Error saving goal:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your goal.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editingGoal ? "Edit Financial Goal" : "Set New Financial Goal"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="e.g., Emergency Fund"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Brief description of your goal"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 🆕 Status Select */}
          <div>
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="inprogress">In Progress</SelectItem>
                <SelectItem value="notstarted">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="currentAmount">Current Amount (₱)</Label>
              <Input
                id="currentAmount"
                type="number"
                value={formData.currentAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    currentAmount: e.target.value,
                  })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor="targetAmount">Target Amount (₱)</Label>
              <Input
                id="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    targetAmount: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="deadline">Target Date</Label>
            <Input
              id="deadline"
              type="date"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
              required
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:text-foreground"
            >
              {editingGoal ? "Update Goal" : "Create Goal"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
