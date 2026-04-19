# Use Case Diagram

The Use Case Diagram highlights the interactions between the users (Employees/HR) and the Candidate Referral Management System.

## 👤 Actors

1.  **Employee/Recruiter (User)**: The primary actor who interacts with the dashboard.
2.  **System**: Handles validation, storage, and retrieval of data.
3.  **Database (MongoDB)**: Stores persistent candidate information.

## 🎯 Use Cases

### User Use Cases
-   **Add Referral**: Submit a new candidate with contact info and resume.
-   **View Dashboard**: See a list of all current referrals.
-   **Search Candidates**: Filter candidates by name, job title, or status.
-   **Update Status**: Change the pipeline stage of a candidate.
-   **Delete Referral**: Remove a candidate from the system.
-   **View Resume**: Open and read the candidate's PDF resume.

### System Use Cases
-   **Validate Input**: Check for valid email, phone, and file formats.
-   **Manage Storage**: Handle PDF file uploads securely.
-   **Maintain Database**: Perform CRUD operations on the Candidate collection.

## 🧬 Mermaid Diagram

```mermaid
useCaseDiagram
    actor User
    actor System
    actor MongoDB

    package "Candidate Referral System" {
        usecase "Add Referral" as UC1
        usecase "View Dashboard" as UC2
        usecase "Search Candidates" as UC3
        usecase "Update Status" as UC4
        usecase "Delete Referral" as UC5
        usecase "View Resume" as UC6
        usecase "Validate Data" as UC7
        usecase "Store Resume" as UC8
    }

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6

    UC1 ..> UC7 : <<include>>
    UC1 ..> UC8 : <<include>>

    UC1 --> MongoDB
    UC2 --> MongoDB
    UC4 --> MongoDB
    UC5 --> MongoDB
    
    System --> UC7
    System --> UC8
```