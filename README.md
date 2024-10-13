# 🌍 Wanderlust-2024

<img src="https://github.com/user-attachments/assets/e8059385-3570-49ab-a20b-127ad6b83ada" height=200  width=300 alt="WL"/>

Welcome to **Wanderlust 2024**! 🌟 This project aims to provide a comprehensive platform for travel enthusiasts, offering features such as map integration 🗺️, user-generated content ✍️, and a seamless experience for discovering new destinations. ✈️✨

Live Link: https://wanderlust-2024-tkqf.onrender.com/listing

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">

## 📚 Table of Contents


- 🤝 How to Contribute
- 🛠️ How to Set Up the Project Locally
- 📬 Contact

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
 
## 🤝 How to Contribute

We welcome contributions to help improve **Wanderlust 2024**! 🚀 Here’s how you can get involved:

1. **Fork the Repository** 🍴
   - Navigate to the [Wanderlust 2024 GitHub page](https://github.com/your-username/Wanderlust-2024). 🌐
   - Click on the Fork button in the top-right corner of the page to create a copy of the repository in your GitHub account. ➕

2. **Clone Your Forked Repository** 🔄
   - After forking, clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-username/Wanderlust-2024.git
     ```
   - Navigate to the project directory:
     ```bash
     cd Wanderlust-2024
     ```

3. **Create a New Branch for Your Changes** 🌿
   - Create a new branch for your feature or fix:
     ```bash
     git checkout -b feature/your-feature-name
     ```

4. **Make Your Changes** ✏️
   - Add your desired features, fix bugs, or improve documentation. 🛠️

5. **Add Your Changes to the Staging Area** 📦
   - Stage the files you modified or created:
     ```bash
     git add .
     ```

6. **Commit Your Changes** 📝
   - Commit your changes with a descriptive message:
     ```bash
     git commit -m "Add [feature/fix] - description"
     ```

7. **Push Your Changes** ⬆️
   - Push the changes to your forked repository:
     ```bash
     git push origin feature/your-feature-name
     ```

## 🛠️ How to Set Up the Project Locally

1. **Clone the Repository** 🔍
   - Clone the repository to your local machine:
     ```bash
     git clone https://github.com/your-username/Wanderlust-2024.git
     ```

2. **Navigate to the Project Directory** 📂
   - Change to the directory where the project is located:
     ```bash
     cd Wanderlust-2024
     ```

3. **Set Up Your Mapbox Account** 🌐
   - Go to [Mapbox](https://www.mapbox.com) and sign up for a free account. 🆓
   - After logging in, navigate to the Tokens section under your account settings. 🔑
   - Create a new Access Token and copy it. You will need this for the `.env` file. 📄

4. **Set Up Your Cloudinary Account** ☁️
   - Go to [Cloudinary](https://cloudinary.com) and sign up for a free account. 🆓
   - After logging in, navigate to your Dashboard. 📊
   - Copy your Cloud Name, API Key, and API Secret. You will need these for the `.env` file. 🔐

5. **Ensure `.env` and `node_modules/` Are in `.gitignore`** 🛡️
   - Before proceeding, ensure that both `.env` and `node_modules/` are added to your `.gitignore` file to prevent sensitive information and large files from being uploaded to GitHub. 🚫
   - If they are not already there, add them:
     ```bash
     echo .env >> .gitignore
     echo node_modules/ >> .gitignore
     ```

6. **Create a `.env` File** 🗃️
   - In the root directory of the project, create a `.env` file and add the following variables:
     ```plaintext
     MAP_TOKEN=your-mapbox-access-token
     ATLAS_DB_TOKEN=your-mongodb-connection-uri # mongodb://127.0.0.1:27017/wanderlust for running mongodb server locally
     SECRET=your-secret-key
     CLOUD_NAME=your-cloudinary-cloud-name
     CLOUD_API_KEY=your-cloudinary-api-key
     CLOUD_API_SECRET=your-cloudinary-api-secret
     PORT=8080 # Default port for the server
     ```

7. **Install Dependencies** ⚙️
   - Install the required Node.js dependencies:
     ```bash
     npm install
     ```

8. **Start the Server** 🚀
   - You have two options to start the server:
     - Using `npx nodemon` for auto-restarting:
       ```bash
       npx nodemon
       ```
     - Or using `node app.js` to start the server manually:
       ```bash
       node app.js
       ```

9. **Environment Setup** 🔒
   - Ensure that the `.env` file is not uploaded to GitHub by checking that `.gitignore` includes `.env`. 📜 The following code snippet prevents `.env` from being deployed if you're running in development mode:
     ```javascript
     if (process.env.NODE_ENV !== 'production') {
       require('dotenv').config();
     }
     ```

Feel free to raise issues and contribute to the repository! 🎉💻

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
 
 
## 📬 Contact

For questions or feedback, feel free to reach out via GitHub issues or contact the project maintainers. ✉️

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
 

## 🤝 Join Our Community of Contributors!

<img src="https://github.com/user-attachments/assets/35934e5d-4bf8-4add-908c-3ce47c9b1536" height=200  width=300 alt="WL"/>

We're excited to have you on board! Whether you're a seasoned developer or just starting out, your skills and ideas can make a significant impact on **Wanderlust 2024**. Here’s how you can get involved:

- **Share Your Ideas** 💡: Have a feature in mind? Let us know!
- **Fix Bugs** 🐛: Help us improve the project by identifying and fixing issues.
- **Enhance Documentation** 📚: Clear documentation helps everyone. Your contributions can make it even better!

Every contribution, big or small, is valued and appreciated. Together, we can create an amazing platform for travel enthusiasts! 🌍✨

 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">


## ❤️ Made with Love by [Soujanya](https://github.com/Soujanya2004)

<a href="https://github.com/Soujanya2004">
    <img src="https://avatars.githubusercontent.com/Soujanya2004" alt="Your Profile" style="width: 100px; height: 100px; border-radius: 100%;">
</a>





 <img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="900">
 
