import { useState } from "react";
import { createCandidate } from "../api/candidateApi";

const ReferralForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
  });

  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^\S+@\S+\.\S+$/;
  const phoneRegex = /^[6-9]\d{9}$/;

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!phoneRegex.test(formData.phone))
      newErrors.phone = "Phone must be a valid 10-digit number starting with 6-9";

    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";

    if (resume && !resume.name.endsWith(".pdf")) {
      newErrors.resume = "Only PDF files are allowed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith(".pdf")) {
        setResume(file);
        if (errors.resume) {
          setErrors({ ...errors, resume: "" });
        }
      } else {
        setErrors({ ...errors, resume: "Only PDF files are allowed" });
        setResume(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("jobTitle", formData.jobTitle);
      if (resume) data.append("resume", resume);

      await createCandidate(data);

      setSuccessMessage("Candidate added successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
      });
      setResume(null);
      if (onSuccess) onSuccess();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      setErrorMessage(
        error.error || "Failed to add candidate. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="referral-form-container">
      <h2>Add New Candidate</h2>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

      <form onSubmit={handleSubmit} className="referral-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={errors.name ? "input-error" : ""}
            placeholder="John Doe"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? "input-error" : ""}
            placeholder="john@example.com"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={errors.phone ? "input-error" : ""}
            placeholder="9876543210"
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className={errors.jobTitle ? "input-error" : ""}
            placeholder="Senior Developer"
          />
          {errors.jobTitle && (
            <span className="error-text">{errors.jobTitle}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="resume">Resume (PDF) *</label>
          <input
            type="file"
            id="resume"
            accept=".pdf"
            onChange={handleFileChange}
            className={errors.resume ? "input-error" : ""}
          />
          {resume && <span className="file-name">{resume.name}</span>}
          {errors.resume && <span className="error-text">{errors.resume}</span>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="submit-btn"
        >
          {loading ? "Adding..." : "Add Candidate"}
        </button>
      </form>
    </div>
  );
};

export default ReferralForm;
