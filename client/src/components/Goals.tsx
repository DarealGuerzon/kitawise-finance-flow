import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Calendar, TrendingUp, AlertCircle } from "lucide-react";
import { AddGoalModal } from "@/components/AddGoalModal";
import { Pencil, Trash2 } from "lucide-react";

// const mockGoals = [
//   {
//     id: 1,
//     title: "Emergency Fund",
//     description: "Build 6-month emergency fund",
//     targetAmount: 300000,
//     currentAmount: 180000,
//     deadline: "2024-12-31",
//     category: "Savings",
//     status: "active"
//   },
//   {
//     id: 2,
//     title: "New Equipment",
//     description: "Save for new camera equipment",
//     targetAmount: 150000,
//     currentAmount: 97500,
//     deadline: "2024-09-30",
//     category: "Equipment",
//     status: "active"
//   },
//   {
//     id: 3,
//     title: "Monthly Income Target",
//     description: "Reach ₱200k monthly income",
//     targetAmount: 200000,
//     currentAmount: 140000,
//     deadline: "2024-08-31",
//     category: "Income",
//     status: "active"
//   },
//   {
//     id: 4,
//     title: "Vacation Fund",
//     description: "Save for Japan trip",
//     targetAmount: 100000,
//     currentAmount: 100000,
//     deadline: "2024-06-30",
//     category: "Personal",
//     status: "completed"
//   },
// ];

export function Goals() {
  const [goals, setGoals] = useState([]);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/api/goals")
      .then((res) => res.json())
      .then((data) => setGoals(data))
      .catch((err) => console.error("Failed to fetch goals:", err));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Savings": "bg-green-100 text-green-800",
      "Equipment": "bg-blue-100 text-blue-800",
      "Income": "bg-purple-100 text-purple-800",
      "Personal": "bg-orange-100 text-orange-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
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
  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Are you sure you want to delete this goal?");
    if (!confirmed) return;
  
    await fetch(`http://localhost:4000/api/goals/${id}`, {
      method: "DELETE",
    });
  
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
  };
  
  const handleEdit = (goal: any) => {
    setEditingGoal(goal);
    setIsAddGoalOpen(true);
  };
  
  const [editingGoal, setEditingGoal] = useState(null);



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Goals</h1>
          <p className="text-gray-600">Set and track your financial objectives</p>
        </div>
        <Button 
          onClick={() => setIsAddGoalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const daysRemaining = getDaysRemaining(goal.deadline);
          const remaining = goal.targetAmount - goal.currentAmount;

          return (
            <Card key={goal.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-lg text-gray-900">{goal.title}</CardTitle>
                  <Badge className={getCategoryColor(goal.category)}>
                    {goal.category}
                  </Badge>
                  <Badge className={getStatusColor(goal.status)}>
                    {goal.status}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(goal)}>
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(goal.id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{goal.description}</p>
            </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Current:</span>
                    <div className="font-bold text-green-600">₱{goal.currentAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Target:</span>
                    <div className="font-bold text-gray-900">₱{goal.targetAmount.toLocaleString()}</div>
                  </div>
                </div>

                {goal.status !== "completed" && (
                  <div className="pt-3 border-t border-gray-100 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-gray-600">Deadline:</span>
                      </div>
                      <span className="text-gray-900">{goal.deadline}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-medium text-orange-600">₱{remaining.toLocaleString()}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        {daysRemaining < 30 && <AlertCircle className="h-3 w-3 text-red-500" />}
                        <span className="text-gray-600">Days left:</span>
                      </div>
                      <span className={`font-medium ${daysRemaining < 30 ? 'text-red-600' : 'text-gray-900'}`}>
                        {daysRemaining} days
                      </span>
                    </div>

                    {remaining > 0 && daysRemaining > 0 && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center space-x-1 mb-1">
                          <TrendingUp className="h-3 w-3 text-blue-600" />
                          <span className="text-xs font-medium text-blue-800">AI Recommendation:</span>
                        </div>
                        <p className="text-xs text-blue-700">
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

      <AddGoalModal
      isOpen={isAddGoalOpen}
      onClose={() => {
        setIsAddGoalOpen(false);
        setEditingGoal(null); // clear editing state when closing
      }}
      editingGoal={editingGoal}
      onAddGoal={(newGoal) => setGoals((prev) => [...prev, newGoal])}
      onUpdateGoal={(updatedGoal) =>
        setGoals((prev) =>
          prev.map((goal) =>
            goal.id === updatedGoal.id ? updatedGoal : goal
      )
    )
  }
/>
    </div>
  );
}
