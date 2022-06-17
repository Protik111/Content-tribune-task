require('dotenv').config('../.env');
const mongoose = require('mongoose');

const dbConnection = async () => {
    const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z2l8a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongoose is Connected');
    } catch (error) {
        console.error(error.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = dbConnection;