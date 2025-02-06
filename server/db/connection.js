const mongoose = require('mongoose');
const db = process.env.DATABASE_URI;

mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err);
    })
