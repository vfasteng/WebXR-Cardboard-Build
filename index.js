// Import required modules.
const express = require('express');
const path = require('path')

// Create app.
const app = express();

// Setup some routing override.
const accessRouteOverrideMapping = {
    '/login': [],
    '/register': [],
    '/home': ['biology', 'chemistry', 'physics', 'math', 'earthscience']
}

const acccessPointOverride = accessPoint => {
    app.post(accessPoint, (req, res, next) => {
        req.method = 'GET';
        next();
    });
}

for (const key in accessRouteOverrideMapping) {
    const nodes = accessRouteOverrideMapping[key];
    if (nodes) {
        nodes.forEach(node => acccessPointOverride(key + node));
    }
    acccessPointOverride(key);
}

// Set static resources.
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/login', express.static(path.join(__dirname, 'public/routes/login')));
app.use('/register', express.static(path.join(__dirname, 'public/routes/register')));
app.use('/home', express.static(path.join(__dirname, 'public/routes/home')));
accessRouteOverrideMapping['/home'].forEach(
    node => app.use('/home/' + node, express.static(path.join(__dirname, 'public/assets/' + node)))
);

// Set port.
const PORT = process.env.PORT || 5000;

// Start server.
app.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}.`)
});