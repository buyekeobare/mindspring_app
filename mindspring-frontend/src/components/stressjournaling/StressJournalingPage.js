import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEntries, createEntry, updateEntry } from "../../api/api";
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

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    fetchAndSetEntries();

    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0]; // yyyy-mm-dd
    setFormData((prev) => ({ ...prev, date: formattedDate }));
  }, []);

  const fetchAndSetEntries = async () => {
    try {
      const data = await fetchEntries();
      setEntries(data);
      setFilteredEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  };

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

    if (!content || !date || isNaN(new Date(date).getTime())) {
      console.error("Invalid date or content");
      return;
    }

    if (isEditing) {
      try {
        const updatedEntry = await updateEntry(editId, { content, date });
        console.log("Updated Entry:", updatedEntry);

        await fetchAndSetEntries();
        setIsEditing(false);
        setEditId(null);
      } catch (error) {
        console.error("Error updating entry:", error);
      }
    } else {
      try {
        const savedEntry = await createEntry({ content, date });
        await fetchAndSetEntries();

        console.log("Saved Entry:", savedEntry);
      } catch (error) {
        console.error("Failed to save entry:", error);
      }
    }

    const today = new Date().toISOString().split("T")[0];
    setFormData({ date: today, content: "" });
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
    const formattedDate = new Date(entryToEdit.date).toISOString().split("T")[0]; // yyyy-mm-dd
    setFormData({ date: formattedDate, content: entryToEdit.content });
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/journal/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete the entry.");

      await fetchAndSetEntries();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const displayedEntries = filteredEntries.length > 0 ? filteredEntries : entries;
  const paginatedEntries = displayedEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="relative first-color">
      <div className="stress-journal contact-page">
        <h1 className="text-fourth-color">Stress Journal</h1>

        <form onSubmit={handleFormSubmit} className="journal-form">
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
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

        <form onSubmit={handleSearchSubmit} className="search-form margin-top-lg">
          <input
            type="text"
            name="date"
            placeholder="Search Date (YYYY-MM-DD)"
            value={searchDate.date}
            onChange={handleSearchChange}
            className="form-control"
            required
            pattern="\d{4}-\d{2}-\d{2}"
            title="Enter the date in YYYY-MM-DD format"
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
