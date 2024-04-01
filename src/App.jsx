import { supabase } from "./utils/supabaseClient/supabaseClient.js";
import React, { useState, useEffect } from "react";
import "./App.css";

function Alert({ message, type }) {
  return (
    <div className={`alert ${type}`}>
      <p>{message}</p>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    age: "",
    contactno: "",
    email: "",
  });
  const [update, setUpdate] = useState({
    id: "",
    name: "",
    age: "",
    contactno: "",
    email: "",
  });
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await supabase.from("users").select("*");
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  }

  function handleChange(event) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function handleChange2(event) {
    setUpdate((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function createUser(event) {
    event.preventDefault();
    setIsLoadingCreate(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .insert({
          name: user.name,
          age: user.age,
          contactno: user.contactno,
          email: user.email,
        })
        .select();
      if (error) {
        throw error;
      }
      console.log("entry created", data);
      setAlert({ message: "User created successfully!", type: "success" });
    } catch (error) {
      console.log("error creating entry", error);
      setAlert({ message: "Error creating user", type: "error" });
    } finally {
      setIsLoadingCreate(false);
    }

    fetchUsers();
  }

  async function deleteUser(userId) {
    setIsLoadingDelete(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .delete()
        .eq("id", userId);
      if (error) {
        throw error;
      }
      console.log("User deleted successfully", data);
      setAlert({ message: "User deleted successfully!", type: "success" });
    } catch (error) {
      console.log("Error deleting user:", error);
      setAlert({ message: "Error deleting user", type: "error" });
    } finally {
      setIsLoadingDelete(false);
    }
    fetchUsers();
  }

  async function displayUser(userId) {
    users.forEach((user) => {
      if (user.id === userId) {
        setUpdate({
          id: user.id,
          name: user.name,
          age: user.age,
          contactno: user.contactno,
          email: user.email,
        });
      }
    });
  }

  async function updateUser(event) {
    event.preventDefault();
    setIsLoadingUpdate(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .update({
          name: update.name,
          age: update.age,
          contactno: update.contactno,
          email: update.email,
        })
        .eq("id", update.id);
      if (error) {
        throw error;
      }
      console.log("User updated successfully", data);
      setAlert({ message: "User updated successfully!", type: "success" });
    } catch (error) {
      console.log("Error updating user:", error);
      setAlert({ message: "Error updating user", type: "error" });
    } finally {
      setIsLoadingUpdate(false);
    }
    fetchUsers();
  }

  return (
    <>
      {/* Alert */}
      {alert.message && <Alert message={alert.message} type={alert.type} />}

      {/* Form for creating user */}
      <form
        onSubmit={createUser}
        className="border-collapse mt-20 max-w-900 mx-40 p-3 border-2 border-gray-500"
      >
        {/* Input fields */}
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <input
          type="number"
          placeholder="Age"
          name="age"
          onChange={handleChange}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <input
          type="text"
          placeholder="Contact Number"
          name="contactno"
          onChange={handleChange}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <button
          type="submit"
          className="border-2 border-pink-300 text-black p-2 m-2 bg-blue-400 rounded-lg hover:bg-pink-400 hover:text-blue-600"
        >
          {isLoadingCreate ? "Loading..." : "Create User"}
        </button>
      </form>

      {/* Form for updating user */}
      <form
        onSubmit={updateUser}
        className="border-collapse mt-20 max-w-900 mx-40 p-3 border-2 border-gray-500"
      >
        {/* Input fields */}
        <input
          type="text"
          name="name"
          onChange={handleChange2}
          defaultValue={update.name}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <input
          type="number"
          name="age"
          onChange={handleChange2}
          defaultValue={update.age}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <input
          type="text"
          name="contactno"
          onChange={handleChange2}
          defaultValue={update.contactno}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <input
          type="email"
          name="email"
          onChange={handleChange2}
          defaultValue={update.email}
          required
          className="border-2 mx-2 p-1 border-purple-400 rounded"
        />
        <button
          type="submit"
          className="border-2 border-pink-300 text-black p-2 m-2 bg-blue-400 rounded-lg hover:bg-pink-400 hover:text-blue-600"
        >
          {isLoadingUpdate ? "Loading..." : "Update User"}
        </button>
      </form>

      {/* Table to display users */}
      <table className="border-collapse mt-20 border-2 border-black my-10">
        <thead>
          <tr>
            <th className="border border-black px-14 py-2">ID</th>
            <th className="border border-black px-14 py-2">Name</th>
            <th className="border border-black px-14 py-2">Age</th>
            <th className="border border-black px-14 py-2">Contact Number</th>
            <th className="border border-black px-14 py-2">Email</th>
            <th className="border border-black px-14 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-black px-8 py-2">{user.id}</td>
              <td className="border border-black px-8 py-2">{user.name}</td>
              <td className="border border-black px-8 py-2">{user.age}</td>
              <td className="border border-black px-8 py-2">
                {user.contactno}
              </td>
              <td className="border border-black px-8 py-2">{user.email}</td>
              <td>
                <button
                  onClick={() => displayUser(user.id)}
                  className="bg-green-600 py-1 px-2 mr-2 border-2 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 py-1 px-2 mr-2 border-2 rounded text-white"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
