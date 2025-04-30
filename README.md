
# Apollo Clone Backend

This is the backend for the **Apollo 24|7** destination page, providing REST APIs for fetching doctor data and adding new doctors. The backend is built using **Node.js** and **Express.js**, and it supports dynamic filtering and pagination of doctor listings. This project uses **MongoDB** as the database.

## 🚀 Features

- ✅ **Add Doctor**: Add a new doctor to the database.
- ✅ **Doctor Listing with Filters**: Fetch doctors with filters such as location, rating, consultation fee, and availability.
- ✅ **Pagination**: Supports paginated responses for doctor listings.
- ✅ **MongoDB Integration**: Uses MongoDB to store and manage doctor data.
- ✅ **Environment Configuration**: Easily configurable via environment variables.

## 📁 Project Structure

```
ApolloCloneBackend/
│
├── controllers/           # Logic for handling API requests
├── models/                # MongoDB models
├── routes/                # API route definitions
├── utils/                 # Utility functions for database and API handling
├── config/                # Configuration files (e.g., database config)
├── .env                   # Environment variables (API keys, database settings)
├── server.js              # Main server entry point
└── README.md              # Project documentation
```

## 🔌 API Endpoints

### 1. **POST /add-doctor**

Adds a new doctor to the database.  
**Request Body**:
```json
{
  "name": "Dr. John Doe",
  "specialization": "General Physician",
  "location": "Delhi",
  "consultation_fee": 500,
  "rating": 4.5,
  "availability": "Mon-Sat 9 AM - 6 PM"
}
```

**Response**:
```json
{
  "message": "Doctor added successfully"
}
```

### 2. **GET /list-doctor-with-filter**

Fetches a paginated list of doctors with optional filters for location, rating, and consultation fee.  
**Query Parameters**:
- `page`: Page number (default: 1)
- `limit`: Number of results per page (default: 10)
- `location`: Filter by location
- `rating`: Filter by rating
- `consultation_fee`: Filter by consultation fee

**Example Request**:
```
GET /list-doctor-with-filter?page=1&limit=10&location=delhi&rating=4
```

**Response**:
```json
{
  "doctors": [
    {
      "name": "Dr. John Doe",
      "specialization": "General Physician",
      "location": "Delhi",
      "consultation_fee": 500,
      "rating": 4.5,
      "availability": "Mon-Sat 9 AM - 6 PM"
    },
    ...
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_records": 50
  }
}
```

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime to run the backend
- **Express.js**: Web framework for creating RESTful APIs
- **MongoDB**: NoSQL database for storing doctor data
- **Mongoose**: MongoDB ODM (Object Data Modeling) for easier interactions with MongoDB
- **Environment Variables**: Managed via `.env` for configurable settings

## 🌍 Environment Variables

Create a `.env` file at the root of the project and add the following:

```
DB_URI=mongodb://localhost:27017/apollo_clone
PORT=5000
```

### MongoDB URI:
- Replace `localhost:27017` with your MongoDB server details if you're using a remote instance or MongoDB Atlas.

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Kumaraman6723/ApolloCloneBackend.git
cd ApolloCloneBackend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file and add your MongoDB URI and other configuration settings.

### 4. Start the Server

```bash
npm start
```

The backend server will run at `http://localhost:5000`.

## 📝 Database Setup

Since the project uses **MongoDB**, there is no need for complex SQL schema. Mongoose handles the schema for the doctors:

**Example Mongoose Model** (`models/Doctor.js`):
```js
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  location: { type: String },
  consultation_fee: { type: Number },
  rating: { type: Number },
  availability: { type: String }
});

module.exports = mongoose.model('Doctor', doctorSchema);
```

