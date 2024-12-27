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