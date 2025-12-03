import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
 
function UserList() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/users").then((res: any) => {
      setUsers(res.data);
    });
  }, []);

  const deleteUser = async (id: string) => {
    await axios.delete(`http://localhost:8000/api/users/${id}`);
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <Link className="btn btn-primary" to="/add">Add User</Link>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <Link to={`/edit/${u.id}`} className="btn btn-warning btn-sm">Edit</Link>
                <button onClick={() => deleteUser(u.id!)} className="btn btn-danger btn-sm ms-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
