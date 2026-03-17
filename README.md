# 🚀 CareerTrack – Job Tracker

CareerTrack is a full stack web application designed to help students organize and manage their internship and job applications efficiently. The platform provides a centralized dashboard where users can track applications, monitor interview schedules, and analyze their progress.

Frontend-Deployed-Link : https://careertrack-flame.vercel.app/ \
Backend-Deployed-Link : https://careertrack-5.onrender.com
---

# 📌 Problem Statement

Students often apply to multiple internships and jobs across different platforms such as company websites, job portals, and referrals. As the number of applications increases, it becomes difficult to keep track of application statuses, deadlines, interview schedules, and follow-ups.

Many students rely on spreadsheets, notes, or memory to track their applications or tasks, which can lead to missed deadlines or forgotten interviews.

CareerTrack solves this problem by providing a centralized platform where students can manage all job applications, monitor progress, and stay organized.

---

# 💡 Solution

CareerTrack allows users to:

- Track internship and job applications in one place  
- Monitor application progress and status  
- Schedule interviews and important deadlines  
- Search and filter applications easily  
- View analytics about their progress

---

# 🛠 Tech Stack

## Frontend
- ReactJS
- Tailwind CSS
- React Router
- Context API

## Backend
- Node.js
- Express.js

## Database
- MongoDB

---

# ✨ Features

## 🔐 Authentication System
- User signup and login
- Password validation
- Protected dashboard routes
- Authentication state stored in LocalStorage

---

## 🧾 Application Management
Users can manage their applications with full CRUD functionality.

- Add new internship and job applications
- View all applications
- Update application status
- Delete applications

Application details include:
- Company name
- Role
- Location
- Date applied
- Status
- Notes

---

## 🔎 Search Functionality
Users can search applications by:
- Company name
- Role
- Location

---

## 🎯 Filtering & Sorting
Applications can be filtered and sorted by:

Filters:
- Application status
- Location
- Priority

Sorting:
- Newest applications
- Oldest applications
- Company name

---

## 📄 Pagination
Pagination is implemented for better performance when displaying large datasets.

Backend:
- MongoDB `limit()` and `skip()` functions

Frontend:
- Pagination UI component

---

## 📅 Calendar & Interview Scheduler
CareerTrack includes a calendar feature to help users manage important events.

Users can:
- Schedule interviews
- Add follow-up reminders
- Track application deadlines
- View upcoming events

Calendar events include:
- Interview dates
- Coding assessments
- Application deadlines
- Follow-up reminders

---

## 📊 Dashboard Analytics
The dashboard provides insights into the user's progress.

Example statistics:
- Total applications
- Interviews scheduled
- Offers received
- Rejections

This helps users visualize and analyze their internship search.

---

## 🌙 Theme Support
CareerTrack includes dark mode and light mode.

Features:
- Theme toggle option
- Theme preference stored in LocalStorage
- Tailwind CSS dark mode support

---

## 📝 Notes & Priority Tags
Users can add additional information to applications.

Features:
- Personal notes for each application
- Priority tags (High / Medium / Low)
- Recruiter contact details

---

## 📱 Responsive UI
The interface is fully responsive and works across:

- Desktop
- Tablet
- Mobile devices

Built using Tailwind CSS responsive utilities.

---

# 🗄 Database Collections

## Users
Stores user account information.

Fields:
- name
- email
- password

---

## Applications
Stores internship application data.

Fields:
- userId
- companyName
- role
- location
- dateApplied
- status
- priority
- notes

---

## Events (Calendar)
Stores interview and reminder events.

Fields:
- userId
- eventTitle
- date
- time
- eventType

---

# 🚀 Future Improvements

- Resume version tracking
- Email reminders for follow-ups
- Job opportunity bookmarking
- Interview preparation tracker
- Application success analytics

---
