/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: John Niagwan Student ID: 121092225 Date: 17/02/2024
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var collegeData = require('./modules/collegeData');
var path = require('path');
app.use(express.static('images'));

// Initialize collegeData
collegeData.initialize()
    .then(() => {
        // Route to handle students
        app.get("/students", (req, res) => {
            const courseParam = req.query.course;

            if (courseParam) {
                collegeData.getStudentsByCourse(parseInt(courseParam))
                    .then(students => {
                        res.json(students);
                    })
                    .catch(() => {
                        res.json({ message: 'no results' });
                    });
            } else {
                collegeData.getAllStudents()
                    .then(students => {
                        res.json(students);
                    })
                    .catch(() => {
                        res.json({ message: 'no results' });
                    });
            }
        });

        // Route to handle TAs
        app.get("/tas", (req, res) => {
            collegeData.getTAs()
                .then(tas => {
                    res.json(tas);
                })
                .catch(() => {
                    res.json({ message: 'no results' });
                });
        });

        // Route to handle courses
        app.get("/courses", (req, res) => {
            collegeData.getCourses()
                .then(courses => {
                    res.json(courses);
                })
                .catch(() => {
                    res.json({ message: 'no results' });
                });
        });

        // Route to handle a single student by num
        app.get("/student/:num", (req, res) => {
            const studentNum = parseInt(req.params.num);
            collegeData.getStudentByNum(studentNum)
                .then(student => {
                    res.json(student);
                })
                .catch(() => {
                    res.json({ message: 'no results' });
                });
        });

        // Default route
        app.get("/", (req, res) => {
            res.sendFile(path.join(__dirname, '/views/home.html'));
        });

        // Route to handle about page
        app.get("/about", (req, res) => {
            res.sendFile(path.join(__dirname, '/views/about.html'));
        });

        // Route to handle HTML demo page
        app.get("/htmlDemo", (req, res) => {
            res.sendFile(path.join(__dirname, '/views/htmlDemo.html'));
        });

        // Handling unmatched routes
        app.use((req, res) => {
            res.status(404).sendFile(path.join(__dirname, '/images/404.jpeg'));
        });

        // Start the HTTP server after initialization
        app.listen(HTTP_PORT, () => {
            console.log("Server listening on port: " + HTTP_PORT);
        });
    })
    .catch(error => {
        console.error(error);
    });
