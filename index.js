const express = require('express');
const cookieParser = require('cookie-parser');  // Required by CSURF when using cookies to store the csrf token
const csrf = require('csurf');  // CSRF Protection middleware
const path = require('path');

const csrfProtection = csrf({
    // cookie: true,
    cookie: {  // We can customize cookie configuration for csrf
        httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
        secure: true,  // Ensures the cookie is sent only over HTTPS
        sameSite: 'Strict'  // Prevents the cookie from being sent with cross-site requests
    },
    value: function(req) {
        return req.headers['x-custom-csrf-token'] || '';  // Look for the token in the custom header. Default header is CSRF-Token
    }
});

const app = express();

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());

// CSRF Middleware used before rendering form and token is passed to form
app.get('/', csrfProtection, function(req, res) {
    res.render('form', { csrfToken: req.csrfToken() });
});

// CSRF Middleware will validate CSRF token sent in headers
app.post('/', csrfProtection, function(req, res) {
    res.json({msg: 'Successfully registered', name: req.body.name});
});

app.listen(3000, function() {
    console.log('Listening on port 3000');
});