import { useEffect, useState } from "react";
import { fetchExpenses, fetchProjects, fetchGoals } from "@/lib/api";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target, AlertTriangle } from "lucide-react";

export function Dashboard() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  useEffect(() => {
    fetchExpenses().then(setExpenses);
    fetchProjects().then(setProjects);
    fetchGoals().then(setGoals);
  }, []);

  const totalIncome = projects.reduce((sum, p) => sum + (p.actualIncome || 0), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  // Calculate goal progress from real-time goals data
  const totalGoalTarget = goals.reduce((sum, g) => sum + (g.targetAmount || 0), 0);
  const totalGoalCurrent = goals.reduce((sum, g) => sum + (g.currentAmount || 0), 0);
  const goalProgress = totalGoalTarget
    ? Math.round((totalGoalCurrent / totalGoalTarget) * 100)
    : 0;

  const barChartData = generateMonthlyData(expenses, projects);

  const expenseData = Object.entries(
    expenses.reduce((acc: any, curr) => {
      if (!acc[curr.category]) acc[curr.category] = 0;
      acc[curr.category] += curr.amount;
      return acc;
    }, {})
  ).map(([name, value]) => ({
    name,
    value,
    color: getCategoryColor(name),
  }));

  function getCategoryColor(category: string) {
    const colors: { [key: string]: string } = {
      "Software Tools": "#4CAF50",
      Equipment: "#2196F3",
      Transport: "#FF9800",
      Marketing: "#9C27B0",
      Office: "#795548",
      Utilities: "#E91E63",
      Other: "#607D8B",
    };
    return colors[category] || "#9E9E9E";
  }

  function generateMonthlyData(expenses: any[], projects: any[]) {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const currentYear = new Date().getFullYear();

    return months.map((month, index) => {
      const monthExpenses = expenses.filter((e) => {
        const date = new Date(e.date);
        return date.getMonth() === index && date.getFullYear() === currentYear;
      });

      const monthProjects = projects.filter((p) => {
        const date = new Date(p.date || p.createdAt);
        return date.getMonth() === index && date.getFullYear() === currentYear;
      });

      const income = monthProjects.reduce((sum, p) => sum + (p.actualIncome || 0), 0);
      const expense = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

      return { month, income, expenses: expense };
    });
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Income
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">From Projects</p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Expenses
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Total spending</p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Net Profit
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{netProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Profit margin: {((netProfit / totalIncome) * 100 || 0).toFixed(0)}%
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Goal Progress
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goalProgress}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              ₱{(totalGoalTarget - totalGoalCurrent).toLocaleString()} to go
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Bar dataKey="income" fill="#4CAF50" name="Income" />
                <Bar dataKey="expenses" fill="#FF5722" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                  labelStyle={{
                    color: "hsl(var(--foreground))",
                  }}
                  itemStyle={{
                    color: "hsl(var(--foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Tips Panel */}
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
            <span>AI Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-sm">
              💡 <strong>Opportunity:</strong> Consider taking on 2 more similar projects to boost income by ₱150,000 this quarter.
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-sm">
              ⚠️ <strong>Budget Alert:</strong> Review subscriptions and consider bundling tools to save ₱8,000/month.
            </p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <p className="text-sm">
              🎯 <strong>Goal Tracking:</strong> You're {goalProgress}% toward your ₱{totalGoalTarget.toLocaleString()} savings goal. To reach it by month-end, save ₱{totalGoalTarget > 0 ? Math.ceil((totalGoalTarget - totalGoalCurrent) / 4).toLocaleString() : 0} weekly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
