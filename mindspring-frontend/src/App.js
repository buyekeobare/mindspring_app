import React, { useState, useEffect } from 'react';

const App = () => {
  const [entry, setEntry] = useState('');
  const [journal, setJournal] = useState([]);

  // Fetch journal entries
  useEffect(() => {
    fetch('http://localhost:5000/journal')
      .then((response) => response.json())
      .then((data) => setJournal(data));
  }, []);

   // Submit new journal entry
   const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entry }),
    })
      .then((response) => response.json())
      .then((data) => {
        setJournal([{ id: data.id, entry, date: new Date().toISOString() }, ...journal]);
        setEntry('');
      });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ThriveWell: Mental Health Tool</h1>

      {/* Journal Section */}
      <section>
        <h2>Stress Journal</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            rows="4"
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Write your thoughts..."
            style={{ width: '100%', padding: '10px' }}
          />
          <button type="submit" style={{ marginTop: '10px', padding: '10px 20px' }}>
            Save Entry
          </button>
        </form>
      </section>

      {/* Display Journal Entries */}
      <section>
        <h2>Your Journal Entries</h2>
        <ul>
          {journal.map((item) => (
            <li key={item.id}>
              <p>{item.entry}</p>
              <small>{new Date(item.date).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;