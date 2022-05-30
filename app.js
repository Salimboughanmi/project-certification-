require ('./db/connect');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

const certifRoute = require('./routes/certificats')
const etudiantRoute = require('./routes/etudiants')
const whiteTest = require('./routes/whiteTest')

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
        return res.status(200).json({})
    }
    next();
})

//routes handling the requests
app.use('/certifs', certifRoute);
app.use('/etudiants', etudiantRoute);
app.use('/whiteTest', whiteTest);

app.use((req, res, next) => {
    const error = new Error("Path Not Fount");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports=app;
