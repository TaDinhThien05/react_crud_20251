import React from "react";

export default function SearchForm({ onChangeValue }) {
  return (
    <input
      type="text"
      placeholder="🔍 Tìm theo name hoặc username..."
      onChange={(e) => onChangeValue(e.target.value)}
      className="search-input"
    />
  );
}
