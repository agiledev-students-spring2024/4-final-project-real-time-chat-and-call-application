const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    profile: {
        name: String,
        year: String,
        bio: String,
        avatar: String,
    },
    answers: {
        gender: String, 
        year: String, 
        pets: String, 
        guests: String, 
        smoke: String,
        drink: String,
        rent_max: Number,
        rent_min: Number, 
        bedtime: Number, 
        quietness : Number, 
        cleanliness: Number 
    },
    preferences: {
        gender: String, 
        year: String, 
        pets: String, 
        guests: String, 
        smoke: String, 
        drink: String, 
        bedtime: String, 
        quietness: String,
        cleanliness: String 
    }
});

// Define the Message schema
const MessageSchema = new mongoose.Schema({
    message: String
});

// Register the models
mongoose.model('User', UserSchema);
mongoose.model('Message', MessageSchema);

// MongoDB connection using async function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DSN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1); // Exit process with failure in case of database connection error
    }
}

module.exports = connectDB;
