import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>404 Error</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <style>
          {`
            body,
            html {
              height: 70vh;
            }
          `}
        </style>
      </head>
      <body className="d-flex justify-content-center align-items-center">
        <div className="col-md-12 text-center">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Sorry, the page you are looking for does not exist.</p>
          <Link to="/">Go to Home Page</Link>
        </div>
      </body>
    </html>
  );
};

export default NotFoundPage;
