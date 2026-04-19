📌 Use Case Diagram – CareerOS (Proof-Based Career Engine)
Actors

Student

Admin

GitHub API (External System)

Scoring Engine (Internal Service)

Student Use Cases

Register via GitHub

Login

Select Career Goal

View Dashboard

View Milestones

Complete Task

Sync GitHub

Track Streak

View Readiness Score

Unlock Next Milestone

View Proof Profile

Admin Use Cases

Login

Create Goal

Create Milestone

Create Tasks

Monitor User Progress

Update Goal Structure

View Platform Analytics

GitHub API Use Cases (External System)

Authenticate User (OAuth)

Provide Repository Data

Provide Commit History

Provide Pull Request Data

Scoring Engine Use Cases

Calculate GitHub Score

Calculate Project Score

Calculate DSA Score

Generate Overall Readiness Score

Update User Progress Status

Diagram (Textual Representation)

Student → (Register via GitHub)
Student → (Select Goal)
Student → (Complete Task)
Student → (Sync GitHub)
Student → (View Readiness Score)

Admin → (Create Goal)
Admin → (Create Milestone)
Admin → (Monitor Users)

System → GitHub API (Fetch Repository Data)
System → Scoring Engine (Calculate Readiness Score)