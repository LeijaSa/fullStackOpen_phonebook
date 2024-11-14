const express = require("express");
const app = express();
const morgan = require("morgan");

let persons = [
  { id: 1, name: "Arto Hellas", number: "040-123456" },
  { id: 2, name: "Ada Lovelace", number: "39-44-5323523" },
  { id: 3, name: "Dan Abramov", number: "12-43-234345" },
  { id: 4, name: "Mary Poppendieck", number: "39-23-6423122" },
];

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Define a custom token to log the body of POST requests
morgan.token("body", (req) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/info", (request, response) => {
  const personsCount = persons.length;
  const currentDate = new Date();
  const responseText = `
    <p>Phonebook has info for ${personsCount} people</p>
    <p>${currentDate}</p>
  `;
  response.send(responseText);
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response
      .status(400)
      .json({ error: "Both name and number are required" });
  }

  const duplicatePerson = persons.find((person) => person.name === name);

  if (duplicatePerson) {
    return response.status(409).json({ error: "Name must be unique" });
  }
  const newPerson = {
    id: Math.floor(Math.random() * 1000000),
    name,
    number,
  };
  persons.push(newPerson);

  response.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
