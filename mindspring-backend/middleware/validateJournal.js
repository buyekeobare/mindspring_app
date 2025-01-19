// middleware/validateJournals.js

module.exports = (req, res, next) => {
  const { date, content } = req.body;

  // Check for missing fields
  if (!date || !content) {
    return res.status(400).json({ error: "Date and content are required." });
  }

  // Check if the date is in a valid format (e.g., YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
  }

  // Ensure content is a non-empty string
  if (typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ error: "Content must be a non-empty string." });
  }

  next(); // Pass to the next middleware or route handler
};
