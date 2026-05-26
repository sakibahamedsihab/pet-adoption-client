# 🐾 PawsHome - Full-Stack Pet Adoption Platform

PawsHome is a fully functional, responsive, and visually striking full-stack Pet Adoption Platform built using **Next.js** for the frontend and **Node.js/Express.js** with **MongoDB** for the backend. The platform allows users to browse available pets, submit adoption requests, and manage their listings and requests through an intuitive, retro neo-brutalism styled dashboard.

## 🚀 Live Links & Repositories
- **Live Client URL:** [https://pet-adoption-client-rho.vercel.app](https://pet-adoption-client-rho.vercel.app)
- **Live Server URL:** [https://pet-adoption-platform-server-8g3c.onrender.com](https://pet-adoption-platform-server-8g3c.onrender.com)
- **Frontend Repository:** [Insert Frontend Git Link Here]
- **Backend Repository:** [Insert Backend Git Link Here]

---

## 🛠️ Tech Stack Used

### Frontend (Client)
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Custom Neo-Brutalist Theme with decorative elements)
- **Authentication:** Better-Auth (Social & Email/Password Authentication)
- **Notifications:** React Hot Toast
- **Icons & Graphics:** Custom SVG Icons & Unsplash optimization

### Backend (Server)
- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (NoSQL Object-Document Database)
- **Environment Management:** Dotenv

---

## ✨ Key Features & Functionalities

### 🌐 Public & User Space
1. **Browse All Pets:** A fully interactive page to view all listed pets with dynamic search and filtering by species.
2. **Dynamic Pet Details:** High-depth pet profiles containing vital statistics (Age, Species, Breed, Location, Gender, Adoption Fee), health & vaccination badges.
3. **Responsive Forms:** Minimalistic, heavily-validated forms styled using neo-brutalist theme presets.

### 📊 Dashboard System (User-Specific)
1. **Overview Stats:** Displays real-time aggregated counters for **Total Listings**, **Active Requests**, and **Adopted Pets** created by the logged-in user.
2. **My Listings:** Tabular presentation of all pets added by the user. Includes real-time listing status, an embedded modal to track incoming adoption requests, and controls to Edit or Delete listings.
3. **Adoption Requests Manager:** Listing owners can review individual incoming requests. Features `Approve` and `Reject` state handlers.
4. **My Requests:** Allows applicants to keep track of their pending, approved, or rejected adoption requests, with a dedicated safety modal to `Cancel` requests.
5. **Add/Update Pet Forms:** Seamless multi-input forms pre-filled with relational MongoDB data hooks for robust data entry.

---

## 🛡️ Edge Cases & Safety Rules Handled

During development, several critical database integrity and validation rules were systematically implemented:

1. **Preventing Duplicate Adoption Requests (Anti-Spam Check):**
   - **Rule:** A user cannot submit multiple adoption requests for the same pet.
   - **Implementation:** The backend explicitly checks the database before allowing an insertion, protecting listings from spamming.

2. **Blocking Requests on Already Adopted Pets (The "Too Late" Check):**
   - **Rule:** Once a pet is adopted, it should completely restrict any further incoming requests.
   - **Implementation:** The backend verifies the adoption status. Concurrently, the frontend dynamically completely hides the request form and renders an `Adopted! 🎉` notification panel instead.

3. **Multi-Approval Enforcement (One Pet, One Family Check):**
   - **Rule:** A listing owner cannot accidentally approve multiple applicants for a single pet.
   - **Implementation:** When an owner triggers an `approved` patch request, the backend performs a localized isolation check to prevent fragmented double-allocation.

4. **Owner Separation Restrictions:**
   - **Rule:** Users are strictly barred from adopting pets listed by themselves.
   - **Implementation:** The client application instantly substitutes the adoption form with an administrative management notice for pet owners.

---

## 💻 Local Installation & Setup Guide

To get a local instance of PawsHome running on your machine, follow these simple steps:

### Prerequisites
- Node.js installed (v18+ recommended)
- MongoDB Atlas cluster URL or local MongoDB instance

### 1. Clone & Setup the Backend (Server)
```bash
# Navigate to your backend directory
cd pet-adoption-platform-server

# Install dependencies
npm install

# Create a .env file in the root directory and add your credentials
PORT=5000
URI=your_mongodb_connection_string

# Start the local development server
npm start