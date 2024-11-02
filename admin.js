if(process.env.NODE_ENV!="production") { //not to deploy .env file while uploading to git
    require('dotenv').config();
}

const mongoose = require('mongoose');
const User = require("./models/user.js");

// Check for environment variable
if (process.env.SETUP_ADMIN !== "run-admin-setup") {
    console.log("Unauthorized access to admin setup.");
    process.exit(1);
}

const dbUrl = process.env.ATLAS_DB_TOKEN;

async function createSingleAdminUser() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Check if the admin user already exists
        const existingAdmin = await User.findOne({ username: process.env.ADMIN_USERNAME });
        if (existingAdmin) {
            console.log("Deleting existing admin user...");
            await User.deleteOne({ username: process.env.ADMIN_USERNAME }); // Delete the existing admin
            console.log("Existing admin user deleted.");
        }

        // Create the new admin user
        const adminUser = new User({
            username: process.env.ADMIN_USERNAME, // Admin username
            email: process.env.ADMIN_EMAIL, // Admin email (make sure it's valid)
            isAdmin: true // Set as admin
        });

        // Set the password
        await User.register(adminUser, process.env.ADMIN_PASSWORD); // Register and hash the password
        console.log("New admin user created successfully!");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        await mongoose.connection.close(); // Ensure the connection is closed
    }
}

createSingleAdminUser();
