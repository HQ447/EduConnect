import React, { useEffect, useState } from "react";
import { Plus, Trash2, Tag, FileText, Settings, Folder } from "lucide-react";

function AdminManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const domain = "http://localhost:8000";

  const token = localStorage.getItem("adminToken");
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  function handleChange(e) {
    setCategory({ ...category, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${domain}/tutor/addCategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setCategory({ name: "", description: "" });
        fetchCategories();
      } else {
        alert(result.message || "Failed to add category.");
      }
    } catch (error) {
      console.log("Error in Adding new Category", error);
      alert("An error occurred while adding category.");
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${domain}/tutor/getAllCategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setCategories(data.categories);
        setError("");
      } else {
        setCategories([]);
        setError("Failed to fetch categories.");
      }
    } catch (error) {
      console.error("Error loading categories ", error);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCat = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const deleteCat = await fetch(`${domain}/tutor/deleteCategory/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await deleteCat.json();

      if (deleteCat.ok) {
        alert(result.message);
        fetchCategories();
      } else {
        alert(result.message || "Failed to delete category.");
      }
    } catch (error) {
      console.error("Server Error in handling Delete Category", error);
      alert("An error occurred while deleting category.");
    }
  };

  return (
    <div className="w-[78%]  max-h-screen overflow-y-auto bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <div className=" mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-6 shadow-lg">
            <Settings className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-pink-800 bg-clip-text text-transparent mb-3">
            Category Management
          </h1>
          <p className="text-gray-600 text-lg">
            Organize and manage your tutoring categories
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Add Category Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3">
              <div className="flex items-center text-white">
                <Plus className="w-6 h-6 mr-3" />
                <h2 className="text-lg font-bold">Add New Category</h2>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                >
                  <Tag className="w-4 h-4 mr-2 text-purple-600" />
                  Category Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={category.name}
                  onChange={handleChange}
                  placeholder="Enter a descriptive category name"
                  required
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="flex items-center text-sm font-semibold text-gray-700 mb-3"
                >
                  <FileText className="w-4 h-4 mr-2 text-purple-600" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of this category"
                  rows={4}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-4 resize-none focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Category
              </button>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <Folder className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-2xl font-bold text-gray-900">
              Existing Categories
            </h2>
            <span className="ml-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
              {categories.length} total
            </span>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-4">
                <div className="animate-spin h-8 w-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
              </div>
              <p className="text-gray-600 text-lg">Loading categories...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <Folder className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-600 text-lg font-medium">{error}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Folder className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-lg">No categories found</p>
              <p className="text-gray-500 text-sm mt-2">
                Create your first category above
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {categories.map((cat, index) => (
                <div
                  key={cat._id}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 transform hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "slideIn 0.5s ease-out forwards",
                  }}
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mr-3"></div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                          {cat.name}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed pl-6">
                        {cat.description || "No description provided"}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteCat(cat._id)}
                      className="flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 hover:text-red-700 transition-all duration-200 transform hover:scale-105 group-hover:shadow-md"
                      aria-label={`Delete category ${cat.name}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default AdminManagement;
