const express = require('express');
const mongoose = require('mongoose');
const { json, urlencoded } = require('body-parser');
// const cors = require('cors');

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));



const mongoUri = 'mongodb+srv://shreya2202shri:IamALINA@sustainable.tau5u.mongodb.net/?retryWrites=true&w=majority&appName=Sustainable';

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    score: Number
});
const User = mongoose.model('Users', userSchema);

app.post('/api/submit', async (req, res) => {
    console.log('Received request:', req.body); // Log incoming data
    try {
        const user = new User(req.body);
        await user.save();
        console.log('Data saved successfully'); // Log success
        res.status(200).json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error); // Log errors
        res.status(500).json({ message: 'Error saving data', error: error.message });
    }
});


module.exports = app;
