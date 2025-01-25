import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEntries, createEntry } from "../../api/api";
import "../../styles/App.css";

const StressJournalingPage = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [formData, setFormData] = useState({ date: "", content: "" });
  const [searchDate, setSearchDate] = useState({ date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const entriesPerPage = 3;
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Retrieve user_id from localStorage
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      navigate("/login"); // Redirect to login if user_id is missing
    }
  }, [navigate]);

  // Fetch entries from the backend on component mount
  useEffect(() => {
    const fetchAndSetEntries = async () => {
      try {
        const data = await fetchEntries();
        setEntries(data);
        setFilteredEntries(data);
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      }
    };

    fetchAndSetEntries();

    // Set today's date as the default in the form
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB");
    setFormData((prev) => ({ ...prev, date: formattedDate }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchDate({ ...searchDate, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { content, date } = formData;

    // Validate that both content and date are provided
    if (!content || !date || isNaN(new Date(date.split("/").reverse().join("-")).getTime())) {
      console.error("Invalid date or content");
      return;
    }

    // Convert date to YYYY-MM-DD format
    const formattedDate = new Date(date.split("/").reverse().join("-")).toISOString().split("T")[0];

    if (isEditing) {
      try {
        const response = await fetch(`${API_URL}/journal/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify({ content, date: formattedDate }),
        });

        if (!response.ok) {
          throw new Error("Failed to update the entry.");
        }

        const updatedEntry = await response.json();

        // Update the entry in local state
        setEntries((prevEntries) =>
          prevEntries.map((entry) => (entry.id === editId ? { ...entry, ...updatedEntry } : entry))
        );
        setFilteredEntries((prevEntries) =>
          prevEntries.map((entry) => (entry.id === editId ? { ...entry, ...updatedEntry } : entry))
        );

        setIsEditing(false);
        setEditId(null);
      } catch (error) {
        console.error("Error updating entry:", error);
      }
    } else {
      const newEntry = { content, date: formattedDate };

      try {
        const savedEntry = await createEntry(newEntry);
        setEntries((prev) => [...prev, savedEntry]);
        setFilteredEntries((prev) => [...prev, savedEntry]);
      } catch (error) {
        console.error("Failed to save entry:", error);
      }
    }

    // Reset the form
    setFormData({ date: new Date().toLocaleDateString("en-GB"), content: "" });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = entries.filter((entry) => entry.date === searchDate.date);
    setFilteredEntries(results);
    setCurrentPage(1);
  };

  const toggleExpand = (id) => {
    setFilteredEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, expanded: !entry.expanded } : entry
      )
    );
  };

  const handleEdit = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setFormData({ date: entryToEdit.date, content: entryToEdit.content });
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/journal/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the entry.");
      }

      // Remove the deleted entry from state
      setEntries((prev) => prev.filter((entry) => entry.id !== id));
      setFilteredEntries((prev) => prev.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const displayedEntries = filteredEntries.length > 0 ? filteredEntries : entries;
  const paginatedEntries = displayedEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const goToAnalytics = () => {
    navigate("/analytics");
  };

  return (
    <div className="relative first-color">
      <div className="stress-journal contact-page">
        <h1 className="text-fourth-color">Stress Journal</h1>

        <form onSubmit={handleFormSubmit} className="journal-form">
          <input
            type="text"
            name="date"
            placeholder="Date (DD/MM/YYYY)"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
            pattern="\d{2}/\d{2}/\d{4}"
            title="Enter the date in DD/MM/YYYY format"
          />
          <textarea
            name="content"
            placeholder="Write your thoughts..."
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
          <button type="submit" className="small-button">
            {isEditing ? "Update Entry" : "Add Entry"}
          </button>
        </form>

        <button onClick={goToAnalytics} className="small-button margin-top-lg">
          View Analytics
        </button>

        <form onSubmit={handleSearchSubmit} className="search-form margin-top-lg">
          <input
            type="text"
            name="date"
            placeholder="Search Date (DD/MM/YYYY)"
            value={searchDate.date}
            onChange={handleSearchChange}
            className="form-control"
            required
            pattern="\d{2}/\d{2}/\d{4}"
            title="Enter the date in DD/MM/YYYY format"
          />
          <button type="submit" className="small-button">Search</button>
        </form>

        <div className="entries-list">
          {paginatedEntries.map((entry) => (
            <div key={entry.id} className="entry-card second-color">
              <p>{entry.date}</p>
              <div className="entry-content">
                {entry.expanded
                  ? entry.content
                  : `${entry.content.slice(0, 100)}...`}
              </div>
              <div className="entry-actions">
                <button onClick={() => toggleExpand(entry.id)} className="small-button">
                  {entry.expanded ? "Read Less" : "Read More"}
                </button>
                <button onClick={() => handleEdit(entry.id)} className="small-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(entry.id)} className="small-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pagination-controls">
          {currentPage > 1 && (
            <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
          )}
          {currentPage * entriesPerPage < displayedEntries.length && (
            <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StressJournalingPage;
