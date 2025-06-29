import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, CreditCard, Folder, DollarSign, Pencil, Trash2 } from "lucide-react";
import { AddExpenseModal } from "@/components/AddExpenseModal";
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from "@/lib/api";

export function Expenses() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<any>(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchExpenses().then(setExpenses);
  }, []);

  const filteredExpenses = expenses.filter(expense => {
    if (filter === "all") return true;
    return expense.type === filter;
  });

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Software Tools": "bg-blue-100 text-blue-800",
      "Equipment": "bg-green-100 text-green-800",
      "Transport": "bg-yellow-100 text-yellow-800",
      "Office": "bg-purple-100 text-purple-800",
      "Utilities": "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Add expense using API
  const handleAddExpense = async (newExpense: any) => {
    const created = await addExpense(newExpense);
    setExpenses(prev => [...prev, created]);
  };

  // Update expense using API
  const handleUpdateExpense = async (updatedExpense: any) => {
    const updated = await updateExpense(updatedExpense._id || updatedExpense.id, updatedExpense);
    setExpenses(prev => prev.map(expense => (expense._id === updated._id ? updated : expense)));
  };

  // Delete expense using API
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this expense?");
    if (!confirmed) return;
    await deleteExpense(id);
    setExpenses(prev => prev.filter(expense => expense._id !== id));
  };

  const handleEdit = (expense: any) => {
    setEditingExpense(expense);
    setIsAddExpenseOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-gray-600">Track project and personal expenses</p>
        </div>
        <Button 
          onClick={() => setIsAddExpenseOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
          className={filter === "all" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          All Expenses
        </Button>
        <Button
          variant={filter === "project" ? "default" : "outline"}
          onClick={() => setFilter("project")}
          className={filter === "project" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Project Expenses
        </Button>
        <Button
          variant={filter === "personal" ? "default" : "outline"}
          onClick={() => setFilter("personal")}
          className={filter === "personal" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Personal Expenses
        </Button>
      </div>

      <Card className="bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gray-900">
            <span>Total Filtered Expenses</span>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-red-600" />
              <span className="text-2xl font-bold text-red-600">
                ₱{totalExpenses.toLocaleString()}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {filteredExpenses.map((expense) => (
          <Card key={expense._id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium text-gray-900">{expense.description}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-sm text-gray-500">{expense.date}</span>
                        {expense.project && (
                          <>
                            <Folder className="h-3 w-3 text-gray-400 ml-2" />
                            <span className="text-sm text-gray-500">{expense.project}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Badge className={getCategoryColor(expense.category)}>
                    {expense.category}
                  </Badge>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">₱{expense.amount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">
                      {expense.type === "project" ? "Project" : "Personal"}
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(expense)}>
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(expense._id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddExpenseModal 
        isOpen={isAddExpenseOpen}
        onClose={() => {
          setIsAddExpenseOpen(false);
          setEditingExpense(null);
        }}
        onAddExpense={handleAddExpense}
        onUpdateExpense={handleUpdateExpense}
        editingExpense={editingExpense}
      />
    </div>
  );
}
