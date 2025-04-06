# Image Compression & Analytics App

A MERN stack application for image compression and analytics. Users can upload images, compress them, and view detailed analytics about the compression process.

## Features

- Image upload with drag-and-drop support
- Automatic image compression using Sharp
- Detailed analytics dashboard with charts
- Image management and download
- Activity logging

## Tech Stack

- Frontend: React (Vite) + Axios + Chart.js + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB + Mongoose
- Image Processing: Sharp
- Logging: Winston

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd image-compression-app
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Create a .env file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/image-compression
PORT=5000
```

4. Install client dependencies:
```bash
cd ../client
npm install
```

## Running the Application

1. Start the server:
```bash
cd server
npm run dev
```

2. Start the client:
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

- POST /api/images - Upload and compress image
- GET /api/images - Get all images
- GET /api/images/:id/download - Download compressed image
- GET /api/analytics - Get compression statistics

## Project Structure

```
project-root/
├── client/                     # React Frontend
│   ├── public
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   |── index.css
│   │   └── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend
│   ├── config/
│   │   ├── database.js
│   │   ├── logger.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── uploads/
│   ├── .env.example
│   ├── app.js
│   └── package.json
│
├── README.md
└── .gitignore
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License. 