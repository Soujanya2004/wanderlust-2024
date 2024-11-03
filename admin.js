if(process.env.NODE_ENV!="production") { //not to deploy .env file while uploading to git
    require('dotenv').config();
}

const mongoose = require('mongoose');
const User = require("./models/user.js");

const dbUrl = process.env.ATLAS_DB_TOKEN;

async function createSingleAdminUser() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Check if the admin user already exists
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (existingAdmin) {
            console.log("Deleting existing admin user...");
            await User.deleteOne({ username: 'admin' }); // Delete the existing admin
            console.log("Existing admin user deleted.");
        }

        // Create the new admin user
        const adminUser = new User({
            username: 'admin', // Admin username
            email: 'admin@example.com', // Admin email (make sure it's valid)
            isAdmin: true // Set as admin
        });

        // Set the password
        await User.register(adminUser, 'password'); // Register and hash the password
        console.log("New admin user created successfully!");
    } catch (error) {
        console.error("Error creating admin user:", error);
    } finally {
        await mongoose.connection.close(); // Ensure the connection is closed
    }
}

createSingleAdminUser();
