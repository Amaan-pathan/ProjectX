import axios from "axios";

// Create Axios instance
const API = axios.create({
  baseURL: "https://candidate-referral-system-backend.onrender.com"
});

// Fetch all candidates
export const fetchCandidates = async () => {
  try {
    const response = await API.get("/candidates");
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to fetch candidates" };
  }
};

// Create a new candidate
export const createCandidate = async (formData) => {
  try {
    const response = await API.post("/candidates", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to create candidate" };
  }
};

// Update candidate status
export const updateStatus = async (candidateId, status) => {
  try {
    const response = await API.put(`/candidates/${candidateId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to update status" };
  }
};

// Delete a candidate
export const deleteCandidate = async (candidateId) => {
  try {
    const response = await API.delete(`/candidates/${candidateId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Failed to delete candidate" };
  }
};
