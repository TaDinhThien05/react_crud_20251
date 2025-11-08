import React, { useState, useEffect } from "react";

export default function ResultTable({ keyword, user, onAdded }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user) {
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
      onAdded();
    }
  }, [user]);

  const editUser = (u) => setEditing({ ...u, address: { ...u.address } });
  const handleEditChange = (field, value) =>
    setEditing((prev) => ({ ...prev, [field]: value }));

  const saveUser = () => {
    setUsers((prev) => prev.map((u) => (u.id === editing.id ? editing : u)));
    setEditing(null);
  };

  const removeUser = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(keyword.toLowerCase()) ||
      u.username.toLowerCase().includes(keyword.toLowerCase())
  );

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <table className="result-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>City</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {filtered.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.address.city}</td>
            <td>
              <button className="btn edit" onClick={() => editUser(u)}>
                Sửa
              </button>
              <button className="btn delete" onClick={() => removeUser(u.id)}>
                Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      {editing && (
        <tfoot>
          <tr>
            <td colSpan="6">
              <div className="edit-form">
                <h4>Sửa người dùng #{editing.id}</h4>
                <input
                  value={editing.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                />
                <input
                  value={editing.username}
                  onChange={(e) => handleEditChange("username", e.target.value)}
                />
                <div className="modal-actions">
                  <button className="btn save" onClick={saveUser}>
                    Lưu
                  </button>
                  <button
                    className="btn cancel"
                    onClick={() => setEditing(null)}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}
