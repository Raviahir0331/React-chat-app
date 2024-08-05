require("dotenv").config(); // Load environment variables

// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cookieSession = require("cookie-session");

const app = express();
const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth 2.0 Setup
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback", // Note the backend URL
    },
    (token, tokenSecret, profile, done) => {
      // Save or update user information in the database
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("http://localhost:3000/home");
  }
);

// API Endpoints
const Signup = require("./api/Signup");
app.use("/api", Signup);
const Login = require("./api/Signin");
app.use("/api", Login);
const Profile = require("./api/Chatbar");
app.use("/api", Profile);
const Mainbar = require("./api/mainar");
app.use("/api", Mainbar);

const authroute = require("./api/authRoutes");
require("./api/passport-setup");
app.use("/api", authroute);
// Socket.io Setup
// io.on('connection', (socket) => {
  

// 
// });
io.on("connection", (socket) => {
  socket.on("joinroom", (room) => {
    console.log("room message", room);
    socket.join(room);
  });

  socket.on('message', (room,message) => {
    console.log('Message received:', message);
    io.to(room).emit('message', message); 
  });
  socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
});

// Start the Server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
