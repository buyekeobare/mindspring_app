import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your backend's base URL

export const fetchEntries = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/entries`);
    return response.data;
  } catch (error) {
    console.error("Error fetching entries:", error);
    throw error;
  }
};

export const createEntry = async (entry) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/entries`, entry);
    return response.data;
  } catch (error) {
    console.error("Error creating entry:", error);
    throw error;
  }
};

export const updateEntry = async (id, updatedEntry) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/entries/${id}`, updatedEntry);
    return response.data;
  } catch (error) {
    console.error("Error updating entry:", error);
    throw error;
  }
};

export const deleteEntry = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/entries/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw error;
  }
};
