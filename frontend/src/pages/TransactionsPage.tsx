import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  categoryId: number;
  category?: { id: number; name: string };
}

interface Category {
  id: number;
  name: string;
}

export default function TransactionsPage() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    type: "expense",
    date: "",
    categoryId: "",
  });

  // Fetch categories & transactions
  useEffect(() => {
    (async () => {
      try {
        const [transRes, catRes] = await Promise.all([
          api.get("/transaction/list"),
          api.get("/category/list"),
        ]);
        setTransactions(transRes.data.data);
        setCategories(catRes.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({
      description: "",
      amount: "",
      type: "expense",
      date: "",
      categoryId: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...form,
      amount: parseFloat(form.amount),
      categoryId: Number(form.categoryId),
    };

    try {
      if (editing) {
        // update
        const res = await api.put(`/transaction/update?id=${editing.id}`, payload);
        setTransactions((prev) =>
          prev.map((t) => (t.id === editing.id ? res.data.data : t))
        );
      } else {
        // create
        const res = await api.post("/transaction/add", payload);
        setTransactions((prev) => [...prev, res.data.data]);
      }
      resetForm();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving transaction");
    }
  };

  const handleEdit = (t: Transaction) => {
    setEditing(t);
    setForm({
      description: t.description,
      amount: String(t.amount),
      type: t.type,
      date: t.date.split("T")[0],
      categoryId: String(t.categoryId),
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transaction/delete?id=${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting transaction");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      {/* Add/Edit Form (only admin & user can see) */}
      {(user?.role === "admin" || user?.role === "user") && (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 space-y-3">
          <h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Transaction</h2>
          <input
            className="border p-2 w-full"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 w-full"
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
          <select
            className="border p-2 w-full"
            name="type"
            value={form.type}
            onChange={handleChange}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <input
            className="border p-2 w-full"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />
          <select
            className="border p-2 w-full"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <div className="flex gap-3">
            <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
              {editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      )}

      {/* Transactions Table */}
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Type</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Category</th>
            {(user?.role === "admin" || user?.role === "user") && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t.id}>
              <td className="border-t py-2 px-4">{t.description}</td>
              <td className="border-t py-2 px-4">{t.amount}</td>
              <td className="border-t py-2 px-4 capitalize">{t.type}</td>
              <td className="border-t py-2 px-4">{new Date(t.date).toLocaleDateString()}</td>
              <td className="border-t py-2 px-4">{t.category?.name || "N/A"}</td>
              {(user?.role === "admin" || user?.role === "user") && (
                <td className="border-t py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
