import React from "react";

export default function QueryInput({ handleSearch }) {
  return (
    <input
      type="text"
      placeholder="� Nhập tên hoặc username để tìm kiếm..."
      onChange={(e) => handleSearch(e.target.value)}
      className="search-input"
    />
  );
}
