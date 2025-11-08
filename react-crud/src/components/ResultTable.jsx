import React, { useState, useEffect } from "react";

export default function UserDataGrid({ searchTerm, newUser, onUserAdded }) {
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (newUser) {
      setUserData((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
      onUserAdded();
    }
  }, [newUser]);

  const startEditing = (user) => setEditingUser({ ...user, address: { ...user.address } });
  const updateEditForm = (field, value) =>
    setEditingUser((prev) => ({ ...prev, [field]: value }));

  const saveChanges = () => {
    setUserData((prev) => prev.map((user) => (user.id === editingUser.id ? editingUser : user)));
    setEditingUser(null);
  };

  const deleteUser = (id) =>
    setUserData((prev) => prev.filter((user) => user.id !== id));

  const filteredUsers = userData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>⌛ Đang tải thông tin người dùng...</p>;

  return (
    <table className="result-table">
      <thead>
        <tr>
          <th>Mã số</th>
          <th>Họ và tên</th>
          <th>Tên đăng nhập</th>
          <th>Email</th>
          <th>Thành phố</th>
          <th>Tùy chọn</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.address.city}</td>
            <td>
              <button className="btn edit" onClick={() => startEditing(user)}>
                ✎ Sửa
              </button>
              <button className="btn delete" onClick={() => deleteUser(user.id)}>
                🗑 Xóa
              </button>
            </td>
          </tr>
        ))}
      </tbody>

      {editingUser && (
        <tfoot>
          <tr>
            <td colSpan="6">
              <div className="edit-form">
                <h4>✏️ Chỉnh sửa thông tin người dùng #{editingUser.id}</h4>
                <input
                  value={editingUser.name}
                  onChange={(e) => updateEditForm("name", e.target.value)}
                  placeholder="Họ và tên"
                />
                <input
                  value={editingUser.username}
                  onChange={(e) => updateEditForm("username", e.target.value)}
                  placeholder="Tên đăng nhập"
                />
                <div className="modal-actions">
                  <button className="btn save" onClick={saveChanges}>
                    ✓ Lưu thay đổi
                  </button>
                  <button
                    className="btn cancel"
                    onClick={() => setEditingUser(null)}
                  >
                    ✕ Hủy bỏ
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
