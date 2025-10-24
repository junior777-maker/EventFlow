const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ===== DADOS SIMULADOS =====
let users = [
  { id: 1, email: 'junior@example.com', password: '123456', name: 'Junior' }
];

let categories = [
  { id: 1, name: 'Show' },
  { id: 2, name: 'Teatro' }
];

let locations = [
  { id: 1, name: 'Arena Expo', latitude: -9.974, longitude: -67.824, address: 'Rua A, 123' },
  { id: 2, name: 'Teatro Central', latitude: -9.973, longitude: -67.825, address: 'Rua B, 456' }
];

let events = [
  {
    id: 1,
    name: 'Evento Inicial',
    description: 'Descrição do evento inicial',
    date: '2025-11-30',
    time: '19:00',
    price: 50,
    categoryId: 1,
    locationId: 1,
    image: 'https://via.placeholder.com/150'
  }
];

// ===== ROTAS =====

// Login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email } });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

// Listar eventos
app.get('/events', (req, res) => {
  const fullEvents = events.map(e => {
    const category = categories.find(c => c.id === e.categoryId);
    const location = locations.find(l => l.id === e.locationId);
    return { ...e, category, location };
  });
  res.json(fullEvents);
});

// Cadastrar evento
app.post('/events', (req, res) => {
  const newEvent = { id: events.length + 1, ...req.body };
  events.push(newEvent);
  res.json({ success: true, event: newEvent });
});

// Listar categorias
app.get('/categories', (req, res) => res.json(categories));

// Cadastrar categoria
app.post('/categories', (req, res) => {
  const newCategory = { id: categories.length + 1, ...req.body };
  categories.push(newCategory);
  res.json({ success: true, category: newCategory });
});

// Listar locais
app.get('/locations', (req, res) => res.json(locations));

// Cadastrar local
app.post('/locations', (req, res) => {
  const newLocation = { id: locations.length + 1, ...req.body };
  locations.push(newLocation);
  res.json({ success: true, location: newLocation });
});

// Perfil do usuário
app.get('/profile/:id', (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (user) {
    res.json({ id: user.id, name: user.name, email: user.email });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
