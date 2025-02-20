import React, { useState } from "react";

// Remove initial data
const initialData = [];

function App() {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({ name: "", food: "", image: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.food) {
      setData([...data, { ...form }]);
      setForm({ name: "", food: "", image: "" });
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
          name="food"
          value={form.food}
          onChange={handleChange}
          placeholder="Favorite Food"
          className="border p-2 mr-2"
        />
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {form.name && form.food ? "Update" : "Add"}
        </button>
      </form>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Favorite Food</th>
            <th className="py-2">Image</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.food}</td>
              <td className="border px-4 py-2">
                {item.image && (
                  <img src={item.image} alt={item.food} className="w-16 h-16" />
                )}
              </td>
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
