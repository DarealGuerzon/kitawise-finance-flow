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
      "Software Tools": "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400",
      "Equipment": "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400",
      "Transport": "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400",
      "Office": "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-400",
      "Utilities": "bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400",
    };
    return colors[category] || "bg-muted text-muted-foreground";
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  const handleAddExpense = async (newExpense: any) => {
    const created = await addExpense(newExpense);
    setExpenses(prev => [...prev, created]);
  };

  const handleUpdateExpense = async (updatedExpense: any) => {
    const updated = await updateExpense(updatedExpense._id || updatedExpense.id, updatedExpense);
    setExpenses(prev => prev.map(expense => (expense._id === updated._id ? updated : expense)));
  };

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
          <h1 className="text-2xl font-bold">Expenses</h1>
          <p className="text-muted-foreground">Track project and personal expenses</p>
        </div>
        <Button onClick={() => setIsAddExpenseOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Expense
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All Expenses
        </Button>
        <Button
          variant={filter === "project" ? "default" : "outline"}
          onClick={() => setFilter("project")}
        >
          Project Expenses
        </Button>
        <Button
          variant={filter === "personal" ? "default" : "outline"}
          onClick={() => setFilter("personal")}
        >
          Personal Expenses
        </Button>
      </div>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Total Filtered Expenses</span>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-red-600 dark:text-red-400" />
              <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                ₱{totalExpenses.toLocaleString()}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {filteredExpenses.map((expense) => (
          <Card key={expense._id} className="border border-border hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{expense.description}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{expense.date}</span>
                        {expense.project && (
                          <>
                            <Folder className="h-3 w-3 text-muted-foreground ml-2" />
                            <span className="text-sm text-muted-foreground">{expense.project}</span>
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
                    <div className="font-bold">{`₱${expense.amount.toLocaleString()}`}</div>
                    <div className="text-xs text-muted-foreground">
                      {expense.type === "project" ? "Project" : "Personal"}
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(expense)}>
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(expense._id)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
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
