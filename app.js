const express = require('express');
const connectDB = require('./config/dbConfig');
const cookieParser = require('cookie-parser');
const {createServer} = require('http')
const cors = require('cors');
const {initializeSocket} = require('./socket/socket.server')
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://mern-tinder-frontend-ondvnjuqy-dipeshdevkotas-projects.vercel.app/" ,// The frontend URL
    credentials: true, // Allow credentials such as cookies to be sent
}));

const httpServer=createServer(app)
initializeSocket(httpServer)


// Import routes
const authroute = require("./routes/auth.routes");
const profileroute = require("./routes/profile.routes");
const requestroute = require("./routes/request.route");
const userroute = require("./routes/user.route");
const chatroute= require('./routes/chat.route')
app.use('/', authroute);
app.use('/', profileroute);
app.use('/', requestroute);
app.use('/', userroute);
app.use('/',chatroute)

// Database Connection and Server Start
connectDB()
    .then(() => {
        console.log('Database connection established...');
        httpServer.listen(5000, () => {
            console.log('Server is running on port 5000');
        });
    })
    .catch((err) => {
        console.error("Database connection failed!", err);
    });
