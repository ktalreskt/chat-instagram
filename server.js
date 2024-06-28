// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let messages = [];

app.get('/messages', (req, res) => {
  res.json(messages);
});

app.post('/messages', (req, res) => {
  const newMessage = { id: Date.now(), ...req.body };
  messages.push(newMessage);
  res.json(newMessage);
});

app.delete('/messages/:id', (req, res) => {
  const messageId = parseInt(req.params.id);
  messages = messages.filter(message => message.id !== messageId);
  res.sendStatus(200); // Respondemos con éxito
});

app.delete('/messages/all', (req, res) => {
  messages = [];
  res.sendStatus(200); // Respondemos con éxito
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});