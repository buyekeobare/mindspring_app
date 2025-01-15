import React, { useState, useEffect } from "react";
import "../../App.css";

const StressJournalingPage = () => {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "", content: "" });
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [expandedEntries, setExpandedEntries] = useState({});
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setFormData((prev) => ({ ...prev, date: today }));
  }, [today]);

  // Fetch entries by date range
  const fetchFilteredEntries = async () => {
    const query = new URLSearchParams(dateRange).toString();
    const response = await fetch(`/api/journal-entries?${query}`);
    const data = await response.json();
    setEntries(data);
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange({ ...dateRange, [name]: value });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchFilteredEntries();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      // Update existing entry
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === editId ? { ...entry, ...formData } : entry
        )
      );
      setEditMode(false);
      setEditId(null);
    } else {
      // Add new entry
      const newEntry = { id: Date.now(), ...formData };
      setEntries([...entries, newEntry]);
    }
    setFormData({ title: "", date: today, content: "" });
  };

  const editEntry = (id) => {
    const entryToEdit = entries.find((entry) => entry.id === id);
    setFormData({ ...entryToEdit });
    setEditMode(true);
    setEditId(id);
  };

  const deleteEntry = (id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedEntries((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  return (
    <div className="relative first-color">
      <div className="stress-journal contact-page">
        <h1 className="text-fourth-color">Stress Journal</h1>

        {/* Form to add or edit an entry */}
        <form onSubmit={handleFormSubmit} className="journal-form">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            min={today}
            max={today}
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
            {editMode ? "Update Entry" : "Add Entry"}
          </button>
        </form>

        {/* Date Range Filter */}
        <form onSubmit={handleSearchSubmit} className="date-range-form">
          <div className="flex gap-4">
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              className="form-control"
            />
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="small-button mt-2">Search</button>
        </form>

        {/* List of journal entries */}
        <div className="entries-list">
          {entries.map((entry) => (
            <div key={entry.id} className="entry-card second-color">
              <h2 className="text-fourth-color">{entry.title}</h2>
              <p>{entry.date}</p>
              <p className="entry-content">
                {expandedEntries[entry.id] || entry.content.length <= 100
                  ? entry.content
                  : `${entry.content.substring(0, 100)}...`}
              </p>
              {entry.content.length > 100 && (
                <button
                  onClick={() => toggleExpand(entry.id)}
                  className="small-button read-more-button"
                >
                  {expandedEntries[entry.id] ? "Read Less" : "Read More"}
                </button>
              )}
              <div className="entry-actions">
                <button onClick={() => editEntry(entry.id)} className="small-button">
                  Edit
                </button>
                <button onClick={() => deleteEntry(entry.id)} className="small-button">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StressJournalingPage;