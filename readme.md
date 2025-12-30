# Mini User Management System

A full-stack (MERN) application for user authentication and admin management.

## 🚀 Features

- **User Authentication**: Secure Login and Signup using JWT and Bcrypt.
- **Profile Management**: Users can update their name and password.
- **Admin Dashboard**: Admins can view all users and Activate/Deactivate accounts.
- **Protected Routes**: Secure navigation using React Router.
- **Modern UI**: Styled with Tailwind CSS and Lucide Icons.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Axios.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas.

## 📦 Installation & Setup

1. **Clone the project**
2. **Setup Backend**:

   - Go to `backend/`
   - Run `npm install`
   - Create a `.env` file with:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     JWT_EXPIRES_IN=90d
     PORT=5000
     ```
   - Run `npm run dev`

3. **Setup Frontend**:

   - Go to `frontend/`
   - Run `npm install`
   - Run `npm run dev`

4. **Access the App**:
   - Open `http://localhost:5173`
