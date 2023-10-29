const User = require('../models/User'); // Import your User model

// Create a new user
async function createUser(req, res) {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Fetch user profile by ID
async function getUserProfile(req, res) {
    const { id } = req.params;
    try {
        const user = await User.findById(id).select('-password'); // Exclude the password field from the response
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserID(req, res) {
    try {
        // You may have an authentication process to identify the current user
        // In this example, let's assume you have a user object on the request
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Assuming you have a 'userId' field in your user document
        // Replace 'User' with the actual name of your user model
        const userId = user.userId;

        if (!userId) {
            return res.status(400).json({ message: "User ID not found" });
        }

        return res.status(200).json({ userId: userId });
    } catch (error) {
        console.error("Error fetching user ID:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}




module.exports = {
    createUser,
    getUserProfile,
    getUserID,
};
