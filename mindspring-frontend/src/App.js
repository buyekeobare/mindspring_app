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