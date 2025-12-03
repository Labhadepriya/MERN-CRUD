import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<any>({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/users/${id}`, form);
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edit User</h2>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={form.name} placeholder="Name" onChange={handleChange} className="form-control mb-2" />

        <input type="email" name="email" value={form.email} placeholder="Email" onChange={handleChange} className="form-control mb-2" />

        <input type="text" name="phone" value={form.phone} placeholder="Phone" onChange={handleChange} className="form-control mb-2" />

        <button className="btn btn-success w-100">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
