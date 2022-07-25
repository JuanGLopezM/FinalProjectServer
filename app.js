require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT


const app = express();
require("./config")(app);


// 👇 MIDDLEWARE MISSING
const allRoutes = require("./routes");
app.use("/api", allRoutes);

const sectionRoutes = require("./routes/section.routes")
app.use("/api/sections", isAuthenticated, sectionRoutes)

const profileRoutes = require("./routes/profile.routes")
app.use("/api", isAuthenticated, profileRoutes)

const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

const subjectRouter = require("./routes/subject.routes");
app.use("/api/subjects", isAuthenticated, subjectRouter);

const resourceRouter = require("./routes/resource.routes");
app.use("/api", isAuthenticated, resourceRouter);            // <== UPDATE


// app.use((req, res, next) => {
//     // If no routes match, send them the React HTML.
//     res.sendFile(__dirname + "/public/index.html");
//   });

// require("./error-handling")(app);

module.exports = app;
