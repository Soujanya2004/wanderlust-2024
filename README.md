# Wanderlust-2024

## Welcome to the Wanderlust-2024 Repository!

Wanderlust
Wanderlust is a full-stack travel website built using the MERN (MongoDB, Express, React, Node.js) stack. The platform allows users to explore, create, and review travel listings, helping travelers discover unique destinations. The application features an intuitive UI, user authentication, real-time map integration, and a robust review system, making it a comprehensive solution for travel enthusiasts.

Features
User Authentication: Secure login and registration using Passport.js.
Create and Manage Listings: Users can create new travel listings, add descriptions, upload images, and specify locations.
Review and Rating System: Users can add reviews to listings and provide ratings.
Real-time Map Integration: Mapbox is integrated to display the location of each listing, offering users an interactive visual experience.
Responsive Design: Fully responsive UI to provide a seamless experience on both mobile and desktop devices.
Cloud-based Image Uploads: Cloudinary is used for image storage and retrieval, ensuring high-quality images for listings.
Protected Routes and Authorization: Access to certain routes is restricted based on user roles and authentication status.

Tech Stack
Frontend: React, HTML, CSS
Backend: Node.js, Express
Database: MongoDB (with Mongoose for data modeling)
Authentication: Passport.js for user authentication
Cloud Storage: Cloudinary for storing and retrieving images
Map Integration: Mapbox for displaying maps with location markers
Deployment: Render for backend deployment

This project allows users to explore and create listings for travel destinations, add reviews, book listings and more, powered by the MERN stack.

## Live URL

https://wanderlust-2024-owqy.onrender.com

### How to Contribute

We welcome contributions to help improve Wanderlust-cp! Here's how you can get involved:

 1. Fork the Repository
- Navigate to the [Wanderlust-2024 GitHub page](https://github.com/Soujanya2004/Wanderlust-2024).
- Click on the **Fork** button in the top-right corner of the page to create a copy of the repository in your GitHub account.

 2. Clone Your Forked Repository
- After forking, clone the repository to your local machine:
  git clone https://github.com/your-username/Wanderlust-2024.git
  
3.Navigate to the project directory:
  -cd Wanderlust-2024

4.Create a new branch for your changes:
git checkout -b feature/your-feature-name

5.Add your desired features, fix bugs, or improve documentation.

6.Add the files you modified or created to the staging area
git add .

7.Commit Your Changes
git commit -m "Add [feature/fix] - description"

8.Push the changes to your forked repository:
git push origin feature/your-feature-name

Steps to setup the project after forking the repo into your **Github** account.

---

## How to Set Up the Project Locally

### 1. Clone the Repository  
Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/Wanderlust-2024.git
```

### 2. Navigate to the Project Directory  
Change to the directory where the project is located:
```bash
cd Wanderlust-2024
```

### 3. Set Up Your Mapbox Account  
- Go to [Mapbox](https://www.mapbox.com/) and sign up for a free account.
- After logging in, navigate to the **Tokens** section under your account settings.
- Create a new **Access Token** and copy it. You will need this for the `.env` file.

### 4. Set Up Your Cloudinary Account  
- Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account.
- After logging in, navigate to your **Dashboard**.
- Copy your **Cloud Name**, **API Key**, and **API Secret**. You will need these for the `.env` file.

### 5. Ensure `.env` and `node_modules/` Are in `.gitignore`  
Before proceeding, ensure that both `.env` and `node_modules/` are added to your `.gitignore` file to prevent sensitive information and large files from being uploaded to GitHub.

If they are not already there, add them:
```bash
echo .env >> .gitignore
echo node_modules/ >> .gitignore
```

### 6. Create a `.env` File  
In the root directory of the project, create a `.env` file and add the following variables:
```bash
MAP_TOKEN=your-mapbox-access-token
ATLAS_DB_TOKEN=your-mongodb-connection-uri # mongodb://127.0.0.1:27017/wanderlust for running mongodb server locally
SECRET=your-secret-key
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
PORT=8080 # Default port for the server
```

### 7. Install Dependencies  
Install the required Node.js dependencies:
```bash
npm install
```

### 8. Start the Server  
You have two options to start the server:
- Using `npx nodemon` for auto-restarting:
  ```bash
  npx nodemon
  ```
- Or using `node app.js` to start the server manually:
  ```bash
  node app.js
  ```

### 9. Environment Setup  
Ensure that the `.env` file is not uploaded to GitHub by checking that `.gitignore` includes `.env`. The following code snippet prevents `.env` from being deployed if you're running in development mode:
```javascript
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
```
---
Feel free to raise issues and contribute to the repository

Steps to setup the project after forking the repo into your **Github** account.

---

## How to Set Up the Project Locally

### 1. Clone the Repository  
Clone the repository to your local machine:
```bash
git clone https://github.com/your-username/Wanderlust-2024.git
```

### 2. Navigate to the Project Directory  
Change to the directory where the project is located:
```bash
cd Wanderlust-2024
```

### 3. Set Up Your Mapbox Account  
- Go to [Mapbox](https://www.mapbox.com/) and sign up for a free account.
- After logging in, navigate to the **Tokens** section under your account settings.
- Create a new **Access Token** and copy it. You will need this for the `.env` file.

### 4. Set Up Your Cloudinary Account  
- Go to [Cloudinary](https://cloudinary.com/) and sign up for a free account.
- After logging in, navigate to your **Dashboard**.
- Copy your **Cloud Name**, **API Key**, and **API Secret**. You will need these for the `.env` file.

### 5. Ensure `.env` and `node_modules/` Are in `.gitignore`  
Before proceeding, ensure that both `.env` and `node_modules/` are added to your `.gitignore` file to prevent sensitive information and large files from being uploaded to GitHub.

If they are not already there, add them:
```bash
echo .env >> .gitignore
echo node_modules/ >> .gitignore
```

### 6. Create a `.env` File  
In the root directory of the project, create a `.env` file and add the following variables:
```bash
MAP_TOKEN=your-mapbox-access-token
ATLAS_DB_TOKEN=your-mongodb-connection-uri # mongodb://127.0.0.1:27017/wanderlust for running mongodb server locally
SECRET=your-secret-key
CLOUD_NAME=your-cloudinary-cloud-name
CLOUD_API_KEY=your-cloudinary-api-key
CLOUD_API_SECRET=your-cloudinary-api-secret
PORT=8080 # Default port for the server
```

### 7. Install Dependencies  
Install the required Node.js dependencies:
```bash
npm install
```

### 8. Start the Server  
You have two options to start the server:
- Using `npx nodemon` for auto-restarting:
  ```bash
  npx nodemon
  ```
- Or using `node app.js` to start the server manually:
  ```bash
  node app.js
  ```

### 9. Environment Setup  
Ensure that the `.env` file is not uploaded to GitHub by checking that `.gitignore` includes `.env`. The following code snippet prevents `.env` from being deployed if you're running in development mode:
```javascript
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

---
Feel free to raise issues and contribute to the repository