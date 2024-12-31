
# URL Shortener Service

## Description

The URL Shortener Service is an API that allows users to shorten long URLs, redirect to the original URL, and view basic click analytics for each short URL. The service is built using Node.js with Express.js and TypeScript, providing three core functionalities:

1. **Shorten URL**: Users can input a long URL and receive a corresponding short URL.
2. **Redirect**: Users can navigate to a short URL and be redirected to the original URL.
3. **Analytics**: The service provides insights into how many times a short URL has been accessed.

The API ensures clean code and follows best practices in software design, including security and data validation.

## Technologies Used

The following are the technologies used in this service:

- Node.js: https://nodejs.org/en
- Express.js: https://expressjs.com/
- TypeScript: https://www.typescriptlang.org/
- PostgreSQL: https://www.postgresql.org/
- Docker: https://www.docker.com/

## Service Local Development

To set up the service locally:

**1. Create a `.env` file with at least the following variables:**
   - DATABASE_URL
   - PROD_DATABASE_URL
   - SWAGGER_SERVER

Tip: Refer to the `.env.example` file in the repository for additional optional variables that can be included based on your setup.

**2. Install the required packages:**

```bash
npm install
```

**3. Run Database Migrations:**

```bash
npm run migrate:all
```

**4. Start the service:**

```bash
npm run dev
```

This script starts the application in development mode. You can consult `package.json` for more details on the available scripts.

**5. Access the API Documentation:**

Open your browser and navigate to the following URL to interact with the API and view the documentation:

API JSON-based web API (OpenAPI): [http://localhost:9000/api-docs/](http://localhost:9000/api-docs/)

*Note: The default port is 9000. If you choose a different port, replace it in the URL accordingly.*

## API Endpoints

The following endpoints are available:

- **POST** `/api/urls/shorten`: Create a short URL from a long URL.
  - **Request Body**:
    ```json
    {
      "originalUrl": "http://example.com"
    }
    ```

- **GET** `/api/urls/{shortCode}`: Redirect to the original URL corresponding to the short URL.
  
- **GET** `/api/urls/stats/{code}`: Get the number of times a short URL has been accessed.

## Deployed URL Shortener Swagger Documentation

For reference, here is the link to the swagger documentation of an URL Shortener APIs:  
[Swagger Doc](https://url-shortener-svc.onrender.com/api-docs)

## Author

- **Author**: Jessie Umuhire Umutesi  
