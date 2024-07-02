# Employee Pin Management System

## Description

The Employee Pin Management System is a web application designed to manage and assign recognition pins to employees based on their achievements and tenure within the company. The application allows authenticated users to view a list of available pins, view a list of employees, and assign pins to employees.

## Features

- **Google Authentication**: Secure login using Google OAuth.
- **Employee Management**: View a list of employees with their details and tenure.
- **Pin Management**: View a list of available pins and their descriptions.
- **Pin Assignment**: Assign recognition pins to employees based on their achievements and tenure.
- **Firebase Integration**: Store and retrieve employee and pin data from Firebase.

## Technologies Used

- **React**: Frontend framework for building user interfaces.
- **TypeScript**: Superset of JavaScript for type safety.
- **Firebase**: Backend-as-a-Service for authentication and Firestore database.
- **Google OAuth**: Authentication via Google accounts.
- **Framer Motion**: Animation library for React.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- Firebase project with Firestore and Authentication enabled.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/employee-pin-management.git
   cd employee-pin-management
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env` file in the root of the project with the following variables:
   ```plaintext
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```
