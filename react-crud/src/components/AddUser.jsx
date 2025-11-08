import React, { useState } from "react";

export default function CreateUserForm({ handleUserAdd }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    address: { street: "", suite: "", city: "" },
    phone: "",
    website: "",
  });

  const updateFormData = (e) => {
    const { id, value } = e.target;
    if (["street", "suite", "city"].includes(id))
      setFormData({ ...formData, address: { ...formData.address, [id]: value } });
    else setFormData({ ...formData, [id]: value });
  };

  const submitForm = () => {
    if (!formData.name || !formData.username)
      return alert("⚠️ Yêu cầu nhập đầy đủ Họ tên và Tên đăng nhập!");
    handleUserAdd(formData);
    setFormData({
      name: "",
      username: "",
      email: "",
      address: { street: "", suite: "", city: "" },
      phone: "",
      website: "",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="adduser-container">
      <button className="btn" onClick={() => setIsModalOpen(true)}>
        ✨ Tạo người dùng mới
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Tạo người dùng mới</h3>
            <input
              id="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={updateFormData}
            />
            <input
              id="username"
              placeholder="Tên đăng nhập"
              value={formData.username}
              onChange={updateFormData}
            />
            <input
              id="email"
              placeholder="Địa chỉ email"
              value={formData.email}
              onChange={updateFormData}
            />
            <input
              id="city"
              placeholder="Thành phố"
              value={formData.address.city}
              onChange={updateFormData}
            />

            <div className="modal-actions">
              <button className="btn save" onClick={submitForm}>
                ✓ Xác nhận
              </button>
              <button className="btn cancel" onClick={() => setIsModalOpen(false)}>
                ✕ Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
