import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ name: "", id: "", points: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [editPoints, setEditPoints] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/items").then((response) => {
      setData(response.data);
    });
  }, []);

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
        axios
          .put(`http://localhost:5000/items/${data[editIndex]._id}`, form)
          .then((response) => {
            const updatedData = data.map((item, index) =>
              index === editIndex ? response.data : item
            );
            setData(updatedData);
            setEditIndex(null);
          });
      } else {
        axios.post("http://localhost:5000/items", form).then((response) => {
          setData([...data, response.data]);
        });
      }
      setForm({ name: "", id: "", points: "" });
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditPoints(data[index].points);
  };

  const handleUpdate = (index) => {
    const updatedItem = { ...data[index], points: editPoints };
    axios
      .put(`http://localhost:5000/items/${data[index]._id}`, updatedItem)
      .then((response) => {
        const updatedData = data.map((item, i) =>
          i === index ? response.data : item
        );
        setData(updatedData);
        setEditIndex(null);
        setEditPoints("");
      });
  };

  const handleDelete = (index) => {
    axios.delete(`http://localhost:5000/items/${data[index]._id}`).then(() => {
      setData(data.filter((_, i) => i !== index));
    });
  };

  return (
    <div className="container p-6 mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="mb-6 text-3xl font-bold text-center text-blue-600">
        CRUD Application
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mb-6">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-1/2 p-3 mb-3 border rounded-lg"
        />
        <input
          type="text"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID"
          className="w-1/2 p-3 mb-3 border rounded-lg"
        />
        <input
          type="text"
          name="points"
          value={form.points}
          onChange={handleChange}
          placeholder="Points"
          className="w-1/2 p-3 mb-3 border rounded-lg"
        />
        <button
          type="submit"
          className="w-1/2 p-3 text-white bg-green-500 rounded-lg"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </form>
      <table className="min-w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr>
            <th className="px-4 py-3 bg-blue-200">Name</th>
            <th className="px-4 py-3 bg-blue-200">ID</th>
            <th className="px-4 py-3 bg-blue-200">Points</th>
            <th className="px-4 py-3 bg-blue-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-3 border">{item.name}</td>
              <td className="px-4 py-3 border">{item.id}</td>
              <td className="px-4 py-3 border">
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editPoints}
                    onChange={handleChangePoints}
                    className="p-2 border rounded-lg"
                  />
                ) : (
                  item.points
                )}
              </td>
              <td className="px-4 py-3 border">
                {editIndex === index ? (
                  <button
                    onClick={() => handleUpdate(index)}
                    className="p-2 mr-2 text-white bg-green-500 rounded-lg"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(index)}
                    className="p-2 mr-2 text-white bg-yellow-500 rounded-lg"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(index)}
                  className="p-2 text-white bg-red-500 rounded-lg"
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
