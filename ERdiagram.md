🗄️ ER Diagram – CareerOS (Proof-Based Career Engine)
Entities
User

id (PK)

name

email (unique)

github_id (unique)

avatar_url

role (student/admin)

created_at

updated_at

Goal

id (PK)

title

description

difficulty_level

created_at

Milestone

id (PK)

title

description

order_index

goal_id (FK → Goal.id)

Task

id (PK)

type (video/project/dsa/github)

requirement

milestone_id (FK → Milestone.id)

UserGoal

id (PK)

user_id (FK → User.id)

goal_id (FK → Goal.id)

started_at

status (active/completed)

Progress

id (PK)

user_id (FK → User.id)

milestone_id (FK → Milestone.id)

completion_percentage

completed (boolean)

completed_at

GitHubData

id (PK)

user_id (FK → User.id)

total_commits

total_repositories

total_pull_requests

last_synced

Streak

id (PK)

user_id (FK → User.id)

current_streak

longest_streak

last_activity_date

ReadinessScore

id (PK)

user_id (FK → User.id)

github_score

project_score

dsa_score

overall_score

calculated_at

Relationships

User 1 — M UserGoal
User 1 — M Progress
User 1 — 1 GitHubData
User 1 — 1 Streak
User 1 — 1 ReadinessScore

Goal 1 — M Milestone
Milestone 1 — M Task

User M — M Goal (via UserGoal)
User M — M Milestone (via Progress)