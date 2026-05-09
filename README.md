# TCC Operational Dashboard

A high performance business intelligence platform built for Transfer and Content Consultants (TCC). This dashboard centralizes contract management, royalty tracking, and product analytics into a unified MERN stack application.

## Key Features

- **Real Time Analytics:** Integrated data visualization using Nivo Charts for revenue breakdown and sales trends.
- **Unified Data Source:** Synchronized with Airtable for flexible cloud based data management within a custom UI.
- **Secure Authentication:** Robust user authentication and session management using JWT and Bcrypt.
- **Responsive Design:** Fully adaptive interface built with Material UI (MUI), optimized for both desktop and mobile operations.
- **Automated Calculations:** Real time calculation of Monthly and Yearly royalties with growth metric comparisons.

## Tech Stack

- **Frontend:** React.js, Redux Toolkit (RTK Query), Material UI, Nivo Charts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Integrations:** Airtable API

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nicholasbilotto/CLIDash.git
   ```
2. **Setup Backend:**
   - Navigate to `/server`
   - Create a `.env` file with `MONGO_URL` and `PORT`.
   - Run `npm install` and `npm start`.
3. **Setup Frontend:**
   - Navigate to `/client`
   - Run `npm install` and `npm start`.

---
*Built by Nicholas Bilotto*
