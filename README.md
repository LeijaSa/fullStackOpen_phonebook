# fullStackOpen_phonebook

### About the Phonebook Full Stack App

This app is a full-stack Phonebook application developed as part of the Open University of Helsinki Full Stack course. It includes both the backend and frontend, integrated into a single project. The backend is built using Node.js and Express, providing a RESTful API to manage the phonebook database, while the frontend is served from the `dist` directory, including an `index.html` file for interacting with the API.

The app is live at: [https://fullstackopen-phonebook-front-and-backend.fly.dev](https://fullstackopen-phonebook-front-and-backend.fly.dev)

### API Endpoints

- **GET** `/api/persons`  
  Returns a JSON array containing all contacts in the phonebook.

- **GET** `/api/persons/:id`  
  Fetches information for a specific person based on their ID.

- **GET** `/info`  
  Shows the total number of contacts and the current date and time.

- **POST** `/api/persons`  
  Adds a new contact to the phonebook. Requires `name` and `number` in the request body.

- **DELETE** `/api/persons/:id`  
  Deletes a contact from the phonebook based on their ID.

### Error Handling

- **404 Unknown Endpoint**  
  Returns a `404` error if a request does not match any defined route.
