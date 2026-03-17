import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";

const Users = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [editingId, setEditingId] = useState(null);

  // LOAD DATA
  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ADD OR UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await updateUser(editingId, formData);
    } else {
      await createUser(formData);
    }

    setFormData({ name: "", email: "" });
    setEditingId(null);
    fetchUsers();
  };

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm("Delete this user?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  // EDIT
  const handleEdit = (row) => {
    setFormData({ name: row.name, email: row.email });
    setEditingId(row.id);
  };

  // SEARCH
  const filteredData = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="btn btn-warning btn-sm me-2"
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">

      <h3>User Management</h3>

      {/* SEARCH */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <form onSubmit={handleSubmit} className="mb-3">

        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control mb-2"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button className="btn btn-primary">
          {editingId ? "Update User" : "Add User"}
        </button>

      </form>

      {/* TABLE */}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />

    </div>
  );
};

export default Users;