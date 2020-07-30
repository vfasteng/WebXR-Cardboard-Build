const express = require('express');
const path = require('path')

const app = express();

app.post("/subjects/biology", function(req, res, next) {
    req.method = 'GET';
    next();
});

app.post("/subjects/chemistry", function(req, res, next) {
    req.method = 'GET';
    next();
});

// Set static folder
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/subjects/biology', express.static(path.join(__dirname, 'public/assets/biology')));
app.use('/subjects/chemistry', express.static(path.join(__dirname, 'public/assets/chemistry')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}.`)
});