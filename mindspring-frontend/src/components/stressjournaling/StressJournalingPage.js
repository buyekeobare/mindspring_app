import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchEntries, createEntry, updateEntry } from "../../api/api";
import "../../styles/App.css";

const StressJournalingPage = () => {
  const [entries, setEntries] = useState([]); // All journal entries
  const [filteredEntries, setFilteredEntries] = useState(null); // Null when no search is performed
  const [formData, setFormData] = useState({ date: "", content: "" });
  const [searchDate, setSearchDate] = useState({ date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const entriesPerPage = 3; // Entries displayed per page
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Redirect if not authenticated
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("User ID not found in localStorage.");
      navigate("/login");
    }
  }, [navigate]);

  // Scroll to top of the page on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Fetch entries on load and set today's date
  useEffect(() => {
    fetchAndSetEntries();
    const today = new Date().toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, date: today }));
  }, []);

  // Fetch entries from the backend
  const fetchAndSetEntries = async () => {
    try {
      const data = await fetchEntries();
      setEntries(data);
      setFilteredEntries(null); // Reset filtered entries after fetching
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchDate({ ...searchDate, [name]: value });
  };

  // Handle new or updated journal entries
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { content, date } = formData;
    if (!content || !date || isNaN(new Date(date).getTime())) {
      console.error("Invalid date or content");
      setLoading(false);
      return;
    }

    try {
      if (isEditing) {
        await updateEntry(editId, { content, date });
      } else {
        await createEntry({ content, date });
      }
      await fetchAndSetEntries();
      setIsEditing(false);
      setEditId(null);
      setFormData({
        date: new Date().toISOString().split("T")[0],
        content: "",
      });
    } catch (error) {
      console.error("Error saving entry:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const results = entries.filter((entry) => entry.date === searchDate.date);
    setFilteredEntries(results);
    setCurrentPage(1);
  };

  // Toggle expand/collapse for entries
  const toggleExpand = (id) => {
    const updatedEntries = (filteredEntries || entries).map((entry) =>
      entry.id === id ? { ...entry, expanded: !entry.expanded } : entry
    );
    if (filteredEntries) {
      setFilteredEntries(updatedEntries);
    } else {
      setEntries(updatedEntries);
    }
  };

  // Edit an existing entry
  const handleEdit = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    const formattedDate = new Date(entryToEdit.date).toISOString().split("T")[0];
    setFormData({ date: formattedDate, content: entryToEdit.content });
    setIsEditing(true);
    setEditId(id);
  };

  // Delete a journal entry
  const handleDelete = async (id) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  // Determine entries to display (filtered or all)
  const displayedEntries = filteredEntries !== null ? filteredEntries : entries;
  const paginatedEntries = displayedEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="relative first-color">
      <div className="stress-journal contact-page">
        <h1 className="text-fourth-color">Stress Journal</h1>

        {/* Add/Edit Form */}
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
          <button type="submit" className="small-button" disabled={loading}>
            {loading ? "Loading..." : isEditing ? "Update Entry" : "Add Entry"}
          </button>
        </form>

        {/* Search Form */}
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

        {/* Display Entries */}
        <div className="entries-list">
          {paginatedEntries.length === 0 ? (
            <div className="blank-state">
              <p>
                {filteredEntries !== null
                  ? "No journals found for the selected date."
                  : "No journal entries available."}
              </p>
            </div>
          ) : (
            paginatedEntries.map((entry) => (
              <div key={entry.id} className="entry-card second-color">
                <p>{entry.date}</p>
                <div className="entry-content">
                  {entry.expanded
                    ? entry.content
                    : `${entry.content.slice(0, 100)}...`}
                </div>
                <div className="entry-actions">
                  <button
                    onClick={() => toggleExpand(entry.id)}
                    className="small-button"
                  >
                    {entry.expanded ? "Read Less" : "Read More"}
                  </button>
                  <button
                    onClick={() => handleEdit(entry.id)}
                    className="small-button"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="small-button"
                    disabled={loading}
                  >
                    {loading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
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
