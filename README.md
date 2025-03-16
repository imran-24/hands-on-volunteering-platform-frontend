# HandsOn - Frontend

## 📌 Project Overview
HandsOn is a community-driven social volunteering platform that connects individuals with meaningful social impact opportunities. The frontend is built using **React.js (Vite)** with **Context API**, **Zustand**, **TanStack Query**, and **Shadcn UI** for styling.

## 🚀 Features
- User authentication (Login, Register, Logout)
- Profile management
- Browse and join volunteer events
- Create and manage community help requests
- Team formation for collaborative initiatives

## 🛠️ Tech Stack
- **Framework:** React.js (Vite)
- **State Management:** Context API, Zustand
- **Data Fetching:** TanStack Query
- **UI Library:** Shadcn UI
- **Routing:** React Router DOM

## ⚙️ Setup Instructions

### Prerequisites
Ensure you have the following installed:
- Node.js (Latest LTS version)
- npm or yarn

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/hands-on-frontend.git
   cd hands-on-frontend
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```sh
     VITE_API_BASE_URL=http://localhost:5000
     ```

### Running the Project
To start the development server:
```sh
npm run dev  # or yarn dev
```
The application will be available at `http://localhost:5173`

## 📁 Project Structure
```
📂 src
 ├── 📂 components  # Reusable UI components
 ├── 📂 pages       # Main application pages
 ├── 📂 context     # Context API setup
 ├── 📂 store       # Zustand state management
 ├── 📂 services    # API service functions
 ├── 📂 hooks       # Custom hooks
 ├── 📂 assets      # Images & styles
```

## 🔗 API Integration
The frontend interacts with the backend API at `VITE_API_BASE_URL`. Ensure the backend is running before testing API calls.

## 🔥 Deployment
For production, build the project using:
```sh
npm run build  # or yarn build
```
Then deploy the `dist/` folder to a hosting service like Vercel, Netlify, or Render.

---


