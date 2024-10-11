# CSRF Protection with CSURF Middleware

## Dependencies required
1. csurf (For CSRF Protection)
2. cookie-parser (required by CSURF)

## CSURF configuration
1. **cookie: true** - This means that the CSRF token is stored in a cookie on the client’s browser. This cookie is sent back to the server with each request, allowing the server to verify the CSRF token. By default cookie will be named _csrf
2. **value: function** - By using the value function, you can tell csurf to:
 - Use a custom header for the CSRF token (in this case, x-custom-csrf-token instead of the default CSRF-Token).
 - Extract the token from anywhere else, such as the query parameters, cookies, or even session data.

## How it works
1. On Initial Request: When a request is made (e.g., on your GET / route), the server generates a CSRF token and stores it in a cookie.
2. Sending the Token to the Client: The CSRF token is also passed to the client (typically in a hidden form field or a meta tag) so that the client can include it in subsequent requests (via form submission, AJAX, etc.).
3. Validation on Subsequent Requests: On subsequent requests (like a POST request), the CSRF token sent by the client (via a header, form field, or AJAX request) is compared against the one stored in the cookie. If they match, the request is valid.

## Routes
**GET Route (/)** - When a client requests the root URL (/), the server uses the CSRF protection middleware to generate a CSRF token and renders the form view, passing the CSRF token to it.
**POST Route (/)** - When the form is submitted, this route validates the CSRF token sent in the request headers.

## Token Validation
1. **Token Extraction** - The middleware retrieves the CSRF token sent in the header (using the custom header specified in value function).
2. **Cookie Comparison** - The middleware also retrieves the CSRF token stored in the cookie (because we set cookie: true).
3. **Validation Logic** - The middleware compares the CSRF token received in the header with the token stored in the cookie.