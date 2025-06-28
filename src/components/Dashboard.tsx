
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, Target, AlertTriangle } from "lucide-react";

const monthlyData = [
  { month: "Jan", income: 65000, expenses: 45000 },
  { month: "Feb", income: 80000, expenses: 52000 },
  { month: "Mar", income: 95000, expenses: 48000 },
  { month: "Apr", income: 110000, expenses: 65000 },
  { month: "May", income: 125000, expenses: 58000 },
  { month: "Jun", income: 140000, expenses: 72000 },
];

const expenseData = [
  { name: "Software Tools", value: 25000, color: "#4CAF50" },
  { name: "Equipment", value: 18000, color: "#2196F3" },
  { name: "Transport", value: 12000, color: "#FF9800" },
  { name: "Marketing", value: 8000, color: "#9C27B0" },
  { name: "Other", value: 5000, color: "#607D8B" },
];

export function Dashboard() {
  const totalIncome = 140000;
  const totalExpenses = 72000;
  const netProfit = totalIncome - totalExpenses;
  const goalProgress = 65; // percentage

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Income</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₱{totalIncome.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Expenses</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₱{totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-red-600 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Net Profit</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">₱{netProfit.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">Profit margin: 49%</p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Goal Progress</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{goalProgress}%</div>
            <p className="text-xs text-orange-600 mt-1">₱35,000 to go</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]}
                  labelStyle={{ color: "#333" }}
                />
                <Bar dataKey="income" fill="#4CAF50" name="Income" />
                <Bar dataKey="expenses" fill="#FF5722" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Expense Breakdown</CardTitle>
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
                <Tooltip formatter={(value: number) => [`₱${value.toLocaleString()}`, ""]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Tips Panel */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex items-center space-x-2">
            <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>AI Insights & Recommendations</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-700">
              💡 <strong>Opportunity:</strong> Your "Mobile App" project is performing 107% above expectations. 
              Consider taking on 2 more similar projects to boost income by ₱150,000 this quarter.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-700">
              ⚠️ <strong>Budget Alert:</strong> Software tool expenses increased by 15% this month. 
              Review subscriptions and consider bundling tools to save ₱8,000/month.
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm text-gray-700">
              🎯 <strong>Goal Tracking:</strong> You're 65% toward your ₱100,000 savings goal. 
              To reach it by month-end, save ₱8,750 weekly or take on one additional ₱25,000 project.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
