# 📂 Firebase File Upload Web App

A React-based web application hosted on **Firebase Hosting** that allows users to securely upload and manage documents.  
Built with **TanStack Query**, **Zustand**, and **Material UI (MUI)** for state management, data fetching, and UI components.

---

## ✨ Features

- **🔐 Authentication**
  - Google Sign-In for secure user authentication
  - Firebase Authentication integration

- **📤 File Upload**
  - Upload PDF and other supported document types directly from the web UI
  - Real-time upload progress and feedback

- **🗄 Storage Strategy**
  - **Google Cloud Storage (GCS)**: Stores actual files
  - **Firestore NoSQL Database**: Stores file metadata (file name, user ID, upload timestamp, status)
  - **Short-lived Signed URLs**: Generated for file access; URLs expire to prevent unauthorized access

- **🎨 Modern UI**
  - Built with **Material UI (MUI)** components for responsive and accessible design

---

## 🛠 Tech Stack

- **Frontend Framework**: React
- **State Management**: Zustand
- **Data Fetching / Caching**: TanStack Query
- **UI Library**: Material UI (MUI)
- **Hosting**: Firebase Hosting
- **Authentication**: Firebase Authentication (Google Sign-In)
- **Storage**: Google Cloud Storage (GCS)
- **Database**: Firestore NoSQL Database

---

## 📦 Prerequisites

Before you start, ensure you have:

- **Node.js** (v16+ recommended)
- A **Firebase project** set up with:
  - Firebase Authentication (Google Sign-In enabled)
  - Firestore Database
  - Google Cloud Storage bucket
- Firebase CLI installed:  
  ```bash
  npm install -g firebase-tools
