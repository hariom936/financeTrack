import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

interface Category {
  id: number;
  name: string;
  description?: string;
}

export default function CategoriesPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // form state (for admin/user only)
  const [editing, setEditing] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    api.get("/category/list")
      .then((res) => setCategories(res.data.data))
      .catch((err) => setError(err.response?.data?.message || "Failed to load categories"))
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setEditing(null);
    setForm({ name: "", description: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const res = await api.put(`/category/update?id=${editing.id}`, form);
        setCategories((prev) =>
          prev.map((c) => (c.id === editing.id ? res.data.data : c))
        );
      } else {
        const res = await api.post("/category/add", form);
        setCategories((prev) => [...prev, res.data.data]);
      }
      resetForm();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error saving category");
    }
  };

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setForm({ name: cat.name, description: cat.description || "" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/category/delete?id=${id}`);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert(err.response?.data?.message || "Error deleting category");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading categories...</div>;
  if (error) return <div className="text-red-500 mt-10">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      {/* Show info for READ-ONLY */}
      {user?.role === "read-only" && (
        <div className="p-3 mb-5 bg-yellow-50 text-yellow-800 border border-yellow-300 rounded text-sm">
          <b>Read-only:</b> You can view all categories, but cannot add, edit, or delete.
        </div>
      )}

      {/* Form for add/edit (admin/user only) */}
      {(user?.role === "admin" || user?.role === "user") && (
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded mb-6 space-y-3">
          <h2 className="text-lg font-semibold">{editing ? "Edit" : "Add"} Category</h2>
          <input
            className="border p-2 w-full"
            name="name"
            placeholder="Category name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="border p-2 w-full"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
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

      {/* Always show category table */}
      <table className="min-w-full bg-white border rounded shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Description</th>
            {(user?.role === "admin" || user?.role === "user") && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {categories.map((c) => (
            <tr key={c.id}>
              <td className="border-t py-2 px-4">{c.name}</td>
              <td className="border-t py-2 px-4">{c.description || "--"}</td>
              {(user?.role === "admin" || user?.role === "user") && (
                <td className="border-t py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(c)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(c.id)}
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
      {categories.length === 0 && (
        <div className="py-6 text-center text-gray-500">No categories yet.</div>
      )}
    </div>
  );
}
