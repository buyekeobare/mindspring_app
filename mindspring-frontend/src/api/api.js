import axios from "axios";

const API_URL = "https://mindspring-backend-app.onrender.com/entries";

const getToken = () => localStorage.getItem("token");

// Fetch all journal entries for the user
export const fetchEntries = async () => {
  try {
    const token = getToken();
    console.log("Request URL:", API_URL);
    console.log("Request Headers:", {
      Authorization: `Bearer ${token}`,
    });
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "fetching entries");
  }
};

// Create a new journal entry
export const createEntry = async (entry) => {
  try {
    const token = getToken();
    console.log("Request URL:", API_URL);
    console.log("Request Headers:", {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });
    const response = await axios.post(API_URL, entry, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "creating a new entry");
  }
};

// Update a journal entry
export const updateEntry = async (id, updatedEntry) => {
  try {
    const token = getToken();
    const response = await axios.put(`${API_URL}/${id}`, updatedEntry, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "updating entry");
  }
};

// Delete a journal entry
export const deleteEntry = async (id) => {
  try {
    const token = getToken();
    console.log("Request URL:", `${API_URL}/${id}`);
    console.log("Request Headers:", {
      Authorization: `Bearer ${token}`,
    });
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "deleting entry");
  }
};

// Generalized error handler
const handleApiError = (error, action) => {
  if (error.response) {
    console.error(`Error ${action}:`, error.response.data);
    throw new Error(error.response.data.error || `Error ${action}`);
  } else if (error.request) {
    console.error(`No response received while ${action}:`, error.request);
    throw new Error(`No response received while ${action}`);
  } else {
    console.error(`Error ${action}:`, error.message);
    throw new Error(`Unexpected error occurred while ${action}`);
  }
};

