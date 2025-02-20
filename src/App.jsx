import React, { useState } from "react";

const initialData = [
  { name: "Steve Smith", id: 211, points: 80 },
  { name: "Jian Wong", id: 122, points: 92 },
  { name: "Chris Peterson", id: 213, points: 91 },
  { name: "Sai Patel", id: 524, points: 94 },
  { name: "Andrew Whitehead", id: 425, points: 99 },
  { name: "Lynn Roberts", id: 626, points: 90 },
  { name: "Robert Sanders", id: 287, points: 75 },
];

function App() {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({ name: "", id: "", points: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.id && form.points) {
      setData([...data, { ...form }]);
      setForm({ name: "", id: "", points: "" });
    }
  };

  const handleEdit = (index) => {
    setForm(data[index]);
    handleDelete(index);
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CRUD Application</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID"
          className="border p-2 mr-2"
        />
        <input
          type="text"
          name="points"
          value={form.points}
          onChange={handleChange}
          placeholder="Points"
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {form.name && form.id && form.points ? "Update" : "Add"}
        </button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">ID</th>
            <th className="py-2">Points</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.points}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white p-2 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white p-2"
                >
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

export default App;
