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
  const [editIndex, setEditIndex] = useState(null);
  const [editPoints, setEditPoints] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleChangePoints = (e) => {
    setEditPoints(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.id && form.points) {
      if (editIndex !== null) {
        const updatedData = data.map((item, index) =>
          index === editIndex ? { ...form } : item
        );
        setData(updatedData);
        setEditIndex(null);
      } else {
        setData([...data, { ...form }]);
      }
      setForm({ name: "", id: "", points: "" });
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditPoints(data[index].points);
  };

  const handleUpdate = (index) => {
    const updatedData = data.map((item, i) =>
      i === index ? { ...item, points: editPoints } : item
    );
    setData(updatedData);
    setEditIndex(null);
    setEditPoints("");
  };

  const handleDelete = (index) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        CRUD Application
      </h1>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col items-center">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-3 mb-3 w-1/2 rounded-lg"
        />
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID"
          className="border p-3 mb-3 w-1/2 rounded-lg"
        />
        <input
          type="text"
          name="points"
          value={form.points}
          onChange={handleChange}
          placeholder="Points"
          className="border p-3 mb-3 w-1/2 rounded-lg"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-3 w-1/2 rounded-lg"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 bg-blue-200">Name</th>
            <th className="py-3 px-4 bg-blue-200">ID</th>
            <th className="py-3 px-4 bg-blue-200">Points</th>
            <th className="py-3 px-4 bg-blue-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border px-4 py-3">{item.name}</td>
              <td className="border px-4 py-3">{item.id}</td>
              <td className="border px-4 py-3">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editPoints}
                    onChange={handleChangePoints}
                    className="border p-2 rounded-lg"
                  />
                ) : (
                  item.points
                )}
              </td>
              <td className="border px-4 py-3">
                {editIndex === index ? (
                  <button
                    onClick={() => handleUpdate(index)}
                    className="bg-green-500 text-white p-2 mr-2 rounded-lg"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-500 text-white p-2 mr-2 rounded-lg"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white p-2 rounded-lg"
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
