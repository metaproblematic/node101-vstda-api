const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

const mockData = [
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];


app.get('/', (req, res) => {
    res.status(200).send({status: "ok"});
})

app.get('/api/TodoItems/', (req, res) => {
    res.status(200).send(mockData);
})

app.get('/api/TodoItems/:number', (req, res) => {
    let result;
    for (let i = 0; i < mockData.length; i++) {
        if (req.params.number == mockData[i].todoItemId) {
        result = mockData[i];
        }
    }
    res.status(200).send(result);
})

app.post('/api/TodoItems/', (req, res) => {
    for (let i = 0; i < mockData.length; i++) {
        if (req.body.todoItemId === mockData[i].todoItemId) {
        mockData[i] = req.body;
        } else {
        mockData.push(req.body);
        }
    }
    res.status(201).send(req.body);
})

app.delete('/api/TodoItems/:number', (req, res) => {
    let deleted; 
    for (let i = 0; i < mockData.length; i++) {
        if (req.params.number == mockData[i].todoItemId) {
        deleted = mockData[i];
        mockData.splice(i, 1);
        }
    }
    res.status(200).send(deleted);
})


module.exports = app;
