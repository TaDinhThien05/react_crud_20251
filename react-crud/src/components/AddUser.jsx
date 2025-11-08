import React, { useState } from "react";

export default function AddUser({ onAdd }) {
  const [adding, setAdding] = useState(false);
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id))
      setUser({ ...user, address: { ...user.address, [id]: value } });
    else setUser({ ...user, [id]: value });
  };

  const handleAdd = () => {
    if (!user.name || !user.username)
      return alert("⚠️ Vui lòng nhập Name và Username!");
    onAdd(user);
    setUser({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setAdding(false);
  };

  return (
    <div className="adduser-container">
      <button className="btn" onClick={() => setAdding(true)}>
        ➕ Thêm người dùng
      </button>

      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Thêm người dùng</h3>
            <input
              id="name"
              placeholder="Name"
              value={user.name}
              onChange={handleChange}
            />
            <input
              id="username"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
            />
            <input
              id="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              id="city"
              placeholder="City"
              value={user.address.city}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button className="btn save" onClick={handleAdd}>
                Lưu
              </button>
              <button className="btn cancel" onClick={() => setAdding(false)}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
