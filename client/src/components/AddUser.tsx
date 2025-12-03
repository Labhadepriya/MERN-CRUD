import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/users", form);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Add User</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="form-control mb-2" />

        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="form-control mb-2" />

        <input type="text" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="form-control mb-2" />

        <button className="btn btn-primary w-100">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
