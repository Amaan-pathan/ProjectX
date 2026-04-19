# Candidate Referral Management System

A modern, full-stack application for managing candidate referrals efficiently. This system allows users to add, track, and manage job candidate referrals with real-time status updates, resume uploads, and advanced search capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Backend API Documentation](#backend-api-documentation)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Assumptions & Limitations](#assumptions--limitations)


---

## 🎯 Overview

The **Candidate Referral Management System** is designed to streamline the process of managing employee referrals for job positions. Organizations can use this system to:

- Add new candidate referrals with detailed information
- Track candidate status through different pipeline stages (Pending → Reviewed → Hired)
- Upload and manage candidate resumes
- Search and filter candidates by job title, name, or status
- Maintain a centralized database of all referrals

This system bridges the gap between manual spreadsheet management and complex HR systems, providing a lightweight, intuitive solution for mid-sized teams.

---

## ✨ Features

### Frontend Features
- **Responsive UI**: Built with React for seamless experience on desktop, tablet, and mobile
- **Real-time Search**: Filter candidates by name, job title, or status instantly
- **Add New Candidates**: User-friendly form to add referrals with validation
- **Status Management**: Dropdown to update candidate status (Pending, Reviewed, Hired)
- **Resume Upload**: Support for PDF resume uploads during candidate creation
- **Delete Candidates**: Remove candidates from the system with confirmation
- **Form Validation**: Client-side validation for email, phone, and file formats
- **Professional Styling**: Clean, modern UI with smooth animations and hover effects
- **Error Handling**: User-friendly error messages and success notifications

### Backend Features
- **RESTful API**: Well-documented REST endpoints for all CRUD operations
- **Input Validation**: Server-side validation for all incoming data
- **File Upload**: Secure handling of PDF resume files with proper naming
- **Status Constraints**: Enforces valid status values (Pending, Reviewed, Hired)
- **Email & Phone Validation**: Regex-based validation for Indian phone numbers and email formats
- **Database Integration**: MongoDB for persistent data storage
- **Error Handling**: Comprehensive error responses with appropriate HTTP status codes

---

## 🛠 Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite** - Build tool and development server
- **Axios** - HTTP client for API requests
- **CSS3** - Professional styling with responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Multer** - Middleware for file uploads
- **CORS** - Cross-origin resource sharing

---

## 📡 Backend API Documentation

### Base URL
```
Production: https://candidate-referral-system-backend.onrender.com
Local: http://localhost:5050
```

### API Endpoints

#### 1. **Create a New Candidate**
**Endpoint:** `POST /candidates`

**Request:**
```bash
curl -X POST https://candidate-referral-system-backend.onrender.com/candidates \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=9876543210" \
  -F "jobTitle=Senior Developer" \
  -F "resume=@resume.pdf"
```

**Request Body (Form Data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| name | String | Yes | Candidate's full name |
| email | String | Yes | Valid email address |
| phone | String | Yes | 10-digit number starting with 6-9 |
| jobTitle | String | Yes | Position being referred for |
| resume | File | No | PDF file (max 5MB) |

**Success Response (201):**
```json
{
  "_id": "6788a1b2c3d4e5f6g7h8i9j0",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "jobTitle": "Senior Developer",
  "status": "Pending",
  "resumeUrl": "uploads/resume_1736350000000.pdf",
  "createdAt": "2025-01-08T10:30:00.000Z",
  "updatedAt": "2025-01-08T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid email"
}
```

or

```json
{
  "error": "Invalid phone number"
}
```

---

#### 2. **Get All Candidates**
**Endpoint:** `GET /candidates`

**Request:**
```bash
curl -X GET https://candidate-referral-system-backend.onrender.com/candidates
```

**Success Response (200):**
```json
[
  {
    "_id": "6788a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "jobTitle": "Senior Developer",
    "status": "Pending",
    "resumeUrl": "uploads/resume_1736350000000.pdf",
    "createdAt": "2025-01-08T10:30:00.000Z",
    "updatedAt": "2025-01-08T10:30:00.000Z"
  },
  {
    "_id": "6788a2c3d4e5f6g7h8i9j0k1",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "9876543211",
    "jobTitle": "Product Manager",
    "status": "Reviewed",
    "resumeUrl": "uploads/resume_1736350100000.pdf",
    "createdAt": "2025-01-07T14:20:00.000Z",
    "updatedAt": "2025-01-08T09:15:00.000Z"
  }
]
```

---

#### 3. **Update Candidate Status**
**Endpoint:** `PUT /candidates/:id/status`

**Request:**
```bash
curl -X PUT https://candidate-referral-system-backend.onrender.com/candidates/6788a1b2c3d4e5f6g7h8i9j0/status \
  -H "Content-Type: application/json" \
  -d '{"status":"Reviewed"}'
```

**Request Body:**
```json
{
  "status": "Reviewed"
}
```

**Status Options:** `Pending`, `Reviewed`, `Hired`

**Success Response (200):**
```json
{
  "_id": "6788a1b2c3d4e5f6g7h8i9j0",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "jobTitle": "Senior Developer",
  "status": "Reviewed",
  "resumeUrl": "uploads/resume_1736350000000.pdf",
  "createdAt": "2025-01-08T10:30:00.000Z",
  "updatedAt": "2025-01-08T11:45:00.000Z"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid status"
}
```

---

#### 4. **Delete a Candidate**
**Endpoint:** `DELETE /candidates/:id`

**Request:**
```bash
curl -X DELETE https://candidate-referral-system-backend.onrender.com/candidates/6788a1b2c3d4e5f6g7h8i9j0
```

**Success Response (200):**
```json
{
  "message": "Candidate deleted successfully"
}
```

**Error Response (404):**
```json
{
  "error": "Candidate not found"
}
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.x or higher) - [Download](https://nodejs.org/)
- **npm** (v8.x or higher) - Comes with Node.js
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Modern Web Browser** - Chrome, Firefox, Safari, or Edge

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Amaan-pathan/Candidate_Referral_System.git
cd Candidate_Referral_System
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `backend` directory:

```env
PORT=5050
MONGODB_URI=mongodb://localhost:27017/candidate-referral-db
NODE_ENV=development
```

**Environment Variables:**
| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5050 |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/candidate-referral-db |
| NODE_ENV | Environment (development/production) | development |

#### MongoDB Setup
Ensure MongoDB is running:

```bash
# macOS (using Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# Open MongoDB Compass or run mongod.exe from MongoDB installation folder
```

### 3. Frontend Setup

#### Install Dependencies
```bash
cd ../frontend
npm install
```

No `.env` file needed - the API URL is configured in `src/api/candidateApi.js`.

---

## 🎮 Running the Application

### Run Locally (Development)

#### Terminal 1 - Start Backend
```bash
cd backend
npm run dev
```

Expected output:
```
Server is running on port 5050
Connected to MongoDB
```

#### Terminal 2 - Start Frontend
```bash
cd frontend
npm run dev
```

Expected output:
```
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

#### Access the Application
Open your browser and navigate to: `http://localhost:5173/`

---


## 📁 Project Structure

```
Candidate_Referral_System/
│
├── backend/
│   ├── models/
│   │   └── Candidate.model.js          # MongoDB schema and model
│   ├── controllers/
│   │   └── candidate.controller.js     # Business logic for API endpoints
│   ├── routes/
│   │   └── candidate.routes.js         # API route definitions
│   ├── middlewares/
│   │   └── upload.middleware.js        # File upload middleware
│   ├── uploads/                        # Storage for uploaded resumes
│   ├── app.js                          # Express app initialization
│   ├── server.js                       # Server startup file
│   ├── package.json
│   └── .env                            # Environment variables (create this)
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── candidateApi.js         # Axios instance and API calls
│   │   ├── components/
│   │   │   ├── CandidateCard.jsx       # Individual candidate card
│   │   │   ├── CandidateList.jsx       # List of candidates grid
│   │   │   ├── ReferralForm.jsx        # Add new candidate form
│   │   │   └── SearchBar.jsx           # Search/filter component
│   │   ├── pages/
│   │   │   └── Dashboard.jsx           # Main dashboard page
│   │   ├── App.jsx                     # Root React component
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js                  # Vite configuration
│
└── README.md
```

---

## 🔧 Key Implementation Details

### Validation Rules

**Email Format:**
- Pattern: `^\S+@\S+\.\S+$`
- Example: `john.doe@company.com`

**Phone Number:**
- Must be 10 digits
- Must start with 6, 7, 8, or 9
- Example: `9876543210`

**Resume Upload:**
- Only PDF files accepted
- Max file size: 5MB (configurable)
- Files stored in `backend/uploads/` directory

### Data Model

**Candidate Schema:**
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, validated),
  phone: String (required, 10 digits),
  jobTitle: String (required),
  status: String (Pending, Reviewed, Hired) - default: "Pending",
  resumeUrl: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## ⚠️ Assumptions & Limitations

### Assumptions
1. **Phone Numbers**: All phone numbers are from India (starting with 6-9, 10 digits)
2. **PDF Resume**: Resume uploads are optional but recommended for a complete referral
3. **Single File Upload**: Only one resume file per candidate
4. **No Authentication**: The system does not implement user authentication or authorization
5. **No Email Notifications**: The system does not send automated emails on status changes

### Known Limitations
1. **No Pagination**: All candidates are loaded at once (suitable for < 1000 records)
2. **No Advanced Filtering**: Basic search by name, job title, or status only
3. **No Export Functionality**: Cannot export candidate data to CSV/Excel
4. **No Bulk Operations**: Cannot update multiple candidates at once
5. **No User Roles**: All users have full access to all candidates
6. **No Audit Trail**: No history of who made what changes

### Future Enhancements
- User authentication and role-based access control
- Email notifications for status changes
- Candidate communication/notes section
- Resume parsing with skill extraction
- Advanced analytics and reporting
- Pagination and infinite scroll
- Bulk import from CSV
- Email templates and automation

---

## 📝 Sample Workflow

1. **Add Candidate**
   - Fill form with candidate details
   - Upload resume (optional but recommended)
   - Click "Add Candidate"
   - Candidate appears in list with "Pending" status

2. **View Candidates**
   - All candidates displayed in responsive grid
   - Search bar filters by name, job title, or status

3. **Update Status**
   - Click status dropdown on any card
   - Select new status (Reviewed or Hired)
   - Status updates immediately in database

4. **Download Resume**
   - Click "📄 View PDF" link to open resume in new tab
   - Opens directly from backend storage

5. **Delete Candidate**
   - Click "Delete" button
   - Confirm deletion in popup
   - Candidate removed from system

---

## 🐛 Troubleshooting

### Backend Won't Start
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running. Start it with:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Frontend Can't Connect to Backend
```
Error: Failed to fetch candidates
```
**Solution:** Check if backend is running on port 5050 and API URL is correct in `candidateApi.js`.

### Resume Upload Fails
```
Error: Only PDF files are allowed
```
**Solution:** Ensure you're uploading a valid PDF file, not other formats.

---


## 🙏 Acknowledgments

- Built with React, Node.js, and MongoDB
- Inspired by modern HR management practices
- Icons and styling inspired by professional design systems

---

**Last Updated:** February 8, 2025
**Version:** 1.0.0
