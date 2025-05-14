const mongoose = require("mongoose");

const DB = process.env.DATABASE_CONNECTION_STRING;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000 // 5 second timeout
})
.then(() => {
    console.log("Database connected successfully!");
})
.catch(err => {
    console.error("Failed to connect to database:", err.message);
    // Optionally exit the process if DB connection is critical
    // process.exit(1);
});
