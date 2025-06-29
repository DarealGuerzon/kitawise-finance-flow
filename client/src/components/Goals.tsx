import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { AddGoalModal } from "@/components/AddGoalModal";
import { Pencil, Trash2 } from "lucide-react";
import { fetchGoals, addGoal, updateGoal, deleteGoal } from "@/lib/api";

export function Goals() {
  const [goals, setGoals] = useState<any[]>([]);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchGoals().then((data) => {
      setGoals(data);
      setLoading(false);
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400";
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Savings": "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
      "Equipment": "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400",
      "Income": "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400",
      "Personal": "bg-orange-100 text-orange-800 dark:bg-orange-800/20 dark:text-orange-400",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleAddGoal = async (newGoal: any) => {
    await addGoal(newGoal);
    const updated = await fetchGoals();
    setGoals(updated);
  };

  const handleUpdateGoal = async (updatedGoal: any) => {
    await updateGoal(updatedGoal._id || updatedGoal.id, updatedGoal);
    const updated = await fetchGoals();
    setGoals(updated);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmed) return;
    await deleteGoal(id);
    setGoals(prev => prev.filter(goal => goal._id !== id));
  };

  const handleEdit = (goal: any) => {
    setEditingGoal(goal);
    setIsAddGoalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Financial Goals</h1>
          <p className="text-muted-foreground">Set and track your financial objectives</p>
        </div>
        <Button onClick={() => setIsAddGoalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading goals...</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
            const daysRemaining = getDaysRemaining(goal.deadline);
            const remaining = goal.targetAmount - goal.currentAmount;

            return (
              <Card key={goal._id} className="border border-border hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{goal.title}</CardTitle>
                      <Badge className={getCategoryColor(goal.category)}>
                        {goal.category}
                      </Badge>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(goal)}>
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(goal._id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{goal.description}</p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{progress.toFixed(1)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Current:</span>
                      <div className="font-bold text-green-600 dark:text-green-400">₱{goal.currentAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Target:</span>
                      <div className="font-bold">{`₱${goal.targetAmount.toLocaleString()}`}</div>
                    </div>
                  </div>

                  {goal.status !== "completed" && (
                    <div className="pt-3 border-t border-border space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground">Deadline:</span>
                        </div>
                        <span>{goal.deadline}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Remaining:</span>
                        <span className="font-medium text-orange-600 dark:text-orange-400">₱{remaining.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          {daysRemaining < 30 && <AlertCircle className="h-3 w-3 text-red-500 dark:text-red-400" />}
                          <span className="text-muted-foreground">Days left:</span>
                        </div>
                        <span className={`font-medium ${daysRemaining < 30 ? 'text-red-600 dark:text-red-400' : ''}`}>
                          {daysRemaining} days
                        </span>
                      </div>

                      {remaining > 0 && daysRemaining > 0 && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                          <div className="flex items-center space-x-1 mb-1">
                            <TrendingUp className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                            <span className="text-xs font-medium text-blue-800 dark:text-blue-400">AI Recommendation:</span>
                          </div>
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            Save ₱{Math.ceil(remaining / daysRemaining * 7).toLocaleString()} per week to reach this goal on time.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <AddGoalModal
        isOpen={isAddGoalOpen}
        onClose={() => {
          setIsAddGoalOpen(false);
          setEditingGoal(null);
        }}
        onAddGoal={handleAddGoal}
        onUpdateGoal={handleUpdateGoal}
        editingGoal={editingGoal}
      />
    </div>
  );
}
