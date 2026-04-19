# Sequence Diagrams

The following diagrams illustrate the core workflows of the Candidate Referral Management System, matching the technical implementation and visual diagrams.

## ➕ Add Candidate Workflow

```mermaid
sequenceDiagram
    participant U as User (HR/Employee)
    participant F as Frontend (React App)
    participant B as Backend (Node.js + Express)
    participant M as Database (MongoDB)
    participant S as File Storage (Multer / Local)

    U->>F: Fill form + attach resume
    F->>B: POST /candidates (multipart/form-data)
    
    rect rgb(240, 240, 240)
        note right of B: Validation
        B->>B: Validate email, phone, file type
        alt Validation fails
            B->>F: 400 Validation Error
            F->>U: Show validation error
        else Validation passes
            B->>S: Store file via Multer
            S-->>B: 201 File stored (path)
            B->>M: INSERT candidate record (data + file path)
            M-->>B: 201 Candidate created
            B-->>F: 201 Created (candidate)
            F-->>U: Update UI / Confirm etc.
        end
    end
```

## 📋 Get Candidates Workflow

```mermaid
sequenceDiagram
    participant U as User (HR/Employee)
    participant F as Frontend (React App)
    participant B as Backend (Node.js + Express)
    participant M as Database (MongoDB)

    U->>F: Request candidate list
    F->>B: GET /candidates
    B->>M: FIND all candidates
    M-->>B: 200 [candidates]
    B-->>F: 200 [candidates]
    F-->>U: Display candidate list
```

## 🔄 Status Update Workflow

```mermaid
sequenceDiagram
    participant U as User (HR/Employee)
    participant F as Frontend (React App)
    participant B as Backend (Node.js + Express)
    participant M as Database (MongoDB)

    U->>F: Select new status for candidate (ID)
    F->>B: PUT /candidates/:id/status (status)
    B->>B: Validate status
    
    alt Status Invalid
        B->>F: 400 invalid status
        F->>U: Show error
    else Status Valid
        B->>M: FIND candidate by ID
        alt Candidate not found
            M-->>B: 404 Not Found
            B-->>F: 404 Candidate not found
            F-->>U: Show not found error
        else Candidate found
            M-->>B: 200 Candidate found
            B->>M: UPDATE candidate status
            M-->>B: 200 Updated candidate
            B-->>F: 200 Updated candidate
            F-->>U: Refresh UI with updated status
        end
    end
```

## 🗑 Candidate Deletion Workflow

```mermaid
sequenceDiagram
    participant U as User (HR/Employee)
    participant F as Frontend (React App)
    participant B as Backend (Node.js + Express)
    participant M as Database (MongoDB)

    U->>F: Click delete for candidate (ID)
    F->>B: DELETE /candidates/:id
    B->>M: FIND candidate by ID
    
    alt Candidate not found
        M-->>B: 404 Not Found
        B-->>F: 404 Candidate not found
        F-->>U: Show not found error
    else Candidate found
        M-->>B: 200 Candidate found
        B->>M: DELETE candidate
        M-->>B: 200 Deleted confirmation
        B-->>F: 200 Deleted confirmation
        F-->>U: Remove candidate from UI
    end
```