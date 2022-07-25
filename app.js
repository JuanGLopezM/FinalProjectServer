require("dotenv/config");
require("./db");
const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware"); // <== IMPORT


const app = express();
require("./config")(app);


// 👇 MIDDLEWARE MISSING
const authRouter = require("./routes/auth.routes");
app.use("/api/auth", authRouter);

const sectionRoutes = require("./routes/section.routes")
app.use("/api/sections", isAuthenticated, sectionRoutes)

const subjectRouter = require("./routes/subject.routes");
app.use("/api/subjects", isAuthenticated, subjectRouter);

const profileRoutes = require("./routes/profile.routes")
app.use("/api/profile", isAuthenticated, profileRoutes)

const resourceRouter = require("./routes/resource.routes");
app.use("/api", isAuthenticated, resourceRouter);      

const allRoutes = require("./routes");
app.use("/api", allRoutes);

module.exports = app;
