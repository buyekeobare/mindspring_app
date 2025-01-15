import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/App.css";

const StressJournalingPage = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [formData, setFormData] = useState({ title: "", date: "", content: "" });
  const [searchDate, setSearchDate] = useState({ date: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const entriesPerPage = 3;
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-GB").split("/").join("/");
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === editId ? { ...entry, ...formData } : entry
        )
      );
      setFilteredEntries((prevEntries) =>
        prevEntries.map((entry) =>
          entry.id === editId ? { ...entry, ...formData } : entry
        )
      );
      setIsEditing(false);
      setEditId(null);
    } else {
      const newEntry = { id: Date.now(), ...formData, expanded: false };
      setEntries([...entries, newEntry]);
      setFilteredEntries([...filteredEntries, newEntry]);
    }
    setFormData({ title: "", date: new Date().toLocaleDateString("en-GB"), content: "" });
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
    setFormData({
      title: entryToEdit.title,
      date: entryToEdit.date,
      content: entryToEdit.content,
    });
    setIsEditing(true);
    setEditId(id);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
    setFilteredEntries(filteredEntries.filter((entry) => entry.id !== id));
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
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
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
              <h2>{entry.title}</h2>
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