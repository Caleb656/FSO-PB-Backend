const express = require('express');
const app = express();
const port = 3001;
app.use(express.json());

let phonebook = [
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

const generateId = () => {
    return String(Math.floor(Math.random() * 1000));
}

app.get('/api/phonebook', (request, response) => {
    response.json(phonebook);
})

app.get('/info', (request, response) => {
    const date = new Date();
    const length = phonebook.length;

    response.send(`Phonebook has info for ${length} people <br/> <br/> ${date}`);
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = request.params.id;
    const person = phonebook.find(person => person.id === id);

    if (person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id;
    const person = phonebook.find(person => person.id === id);

    if (person) {
        phonebook = phonebook.filter(person => person.id !== id);
        response.status(204).end();
    }
    else {
        response.status(404).end();
    }
})

app.post('/api/phonebook', (request, response) => {
    const body = request.body;
    const data = body.name && body.number;
    if (!data) {
        return response.status(400).json({
            error: 'content-missing'
        });
    }

    if (phonebook.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'phonebook name already exists'
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    phonebook = phonebook.concat(person);
    response.json(person);
})

app.listen(port, () => {console.log(`Listening on port: ${port}`)})