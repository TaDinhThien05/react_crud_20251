import React, { useState } from "react";
import SearchForm from "./components/SearchForm.jsx";
import AddUser from "./components/AddUser.jsx";
import ResultTable from "./components/ResultTable.jsx";

function App() {
  const [kw, setKeyword] = useState("");
  const [newUser, setNewUser] = useState(null);

  return (
    <div className="app-container">
      <h1>Quản lý người dùng</h1>
      <SearchForm onChangeValue={setKeyword} />
      <AddUser onAdd={setNewUser} />
      <ResultTable
        keyword={kw}
        user={newUser}
        onAdded={() => setNewUser(null)}
      />
    </div>
  );
}

export default App;
