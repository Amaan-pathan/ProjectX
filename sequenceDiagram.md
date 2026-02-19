🔄 Sequence Diagram – GitHub Sync & Readiness Score Update
Main Flow: Student Syncs GitHub to Update Career Progress

Actor: Student

System Components:

Frontend (React)

Backend API (Express)

GitHub API

Database (PostgreSQL)

Scoring Engine

Student logs into CareerOS using GitHub OAuth.

Frontend → Backend: GET /auth/github
Backend → GitHub API: OAuth request
GitHub API → Backend: Access token
Backend → Database: Store user profile
Backend → Frontend: Login success

Student selects a Goal (e.g., Frontend Developer).

Frontend → Backend: POST /user-goals
Backend → Database: Create UserGoal record
Database → Backend: Confirmation
Backend → Frontend: Goal activated

Student clicks "Sync GitHub".

Frontend → Backend: POST /sync-github
Backend → GitHub API: Fetch commits & repositories
GitHub API → Backend: Return commit data
Backend → Database: Update GitHubData
Backend → Scoring Engine: Recalculate readiness score
Scoring Engine → Backend: Updated score
Backend → Database: Update ReadinessScore
Backend → Frontend: Return updated progress

Frontend → Student: Dashboard updated (New Score + Streak)

If milestone criteria met:

Backend → Database: Mark milestone completed
Backend → Frontend: Unlock next milestone