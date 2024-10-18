const express = require('express');
const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json());
app.use(cookieParser())


const authroute = require("./routes/auth.routes")
const profileroute = require("./routes/profile.routes")
const requestroute = require("./routes/request.route")


app.use('/', authroute);

app.use('/',profileroute)

app.use('/',requestroute)



// Database Connection and Server Start
connectDB()
    .then(() => {
        console.log('Database connection established...');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error("Database connection failed!", err);
    });
