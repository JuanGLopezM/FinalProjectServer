const subjects = [
    { title: "React", description: "Replaces Handlebars", tags:"1", resources: "13" },
    { title: "Javascript", description: "Main logic", tags:"2", resources: "12" },
    { title: "Node", description: "First bridge with backend", tags:"3", resources: "11"},
    { title: "Express", description: "Second bridge with backend", tags:"3", resources: "11"},
    { title: "MongoDB", description: "Database", tags:"3", resources: "11"},
];


const mongoose = require('mongoose');
const Subject = require('./models/Subject.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://admin:admin@cluster0.kpe2aqj.mongodb.net/project-CodeIn"

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

Subject.create(subjects)
    .then(droneFromDB => {
        console.log(`Created ${droneFromDB.length} Subjects`);

        // Once created, close the DB connection
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating drones from the DB: ${err}`));