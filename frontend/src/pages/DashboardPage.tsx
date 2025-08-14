import React, { useEffect, useState } from "react";
import api from "../api/api";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import { useAuth } from "../context/AuthContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA46BE", "#F84F6F"];

export default function DashboardPage() {
  const { user } = useAuth();
  const [incomeExpense, setIncomeExpense] = useState<{income: number; expense: number}>({ income: 0, expense: 0 });
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Assuming these backend endpoints exist – adjust URLs if needed
        const [ieRes, catRes, monthRes] = await Promise.all([
          api.get("/analytics/income-vs-expense"),
          api.get("/analytics/spending-by-category"),
          api.get("/analytics/monthly-trend"),
        ]);

        setIncomeExpense(ieRes.data.data);
        setCategoryData(catRes.data.data);
        setMonthlyData(monthRes.data.data);
      } catch (err) {
        console.error("Error loading analytics", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center py-8">Loading dashboard...</div>;

  return (
    <div className="p-6 space-y-10">

      <h1 className="text-2xl font-bold mb-4">Welcome {user?.name}! 📊</h1>

      {/* Income vs Expense */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Income vs Expense</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { name: "Income", value: incomeExpense.income },
            { name: "Expense", value: incomeExpense.expense }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Spending by Category */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Spending by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="amount"
              nameKey="category"
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Monthly Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Line type="monotone" dataKey="income" stroke="#00C49F"/>
            <Line type="monotone" dataKey="expense" stroke="#FF8042"/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
