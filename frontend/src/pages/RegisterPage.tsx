import React, { useState } from "react";
import api from "../api/api";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try {
            await api.post("/user/add", {
                ...form,
                phone: Number(form.phone),
            });
            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80">
                <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input name="first_name" placeholder="First Name" value={form.first_name}
                    onChange={handleChange} required className="border p-2 w-full mb-2" />
                <input name="last_name" placeholder="Last Name" value={form.last_name}
                    onChange={handleChange} required className="border p-2 w-full mb-2" />
                <input name="email" placeholder="Email" value={form.email}
                    onChange={handleChange} required className="border p-2 w-full mb-2" />
                <input name="phone" placeholder="Phone" value={form.phone}
                    onChange={handleChange} className="border p-2 w-full mb-2" />
                <input type="password" name="password" placeholder="Password" value={form.password}
                    onChange={handleChange} required className="border p-2 w-full mb-4" />

                <button className="bg-green-500 hover:bg-green-600 text-white p-2 rounded w-full">
                    Register
                </button>

                <p className="text-center mt-4 text-sm">
                    Already have an account? <Link className="text-blue-500" to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}
