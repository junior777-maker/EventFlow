const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ===== DADOS SIMULADOS =====
let usuarios = [
  { id: 1, email: 'junior@example.com', password: '123456', name: 'Junior' }
];

let categorias = [
  { id: 1, name: 'Show' },
  { id: 2, name: 'Teatro' }
];

let locais = [
  { id: 1, name: 'Arena Expo', latitude: -9.974, longitude: -67.824, address: 'Rua A, 123' },
  { id: 2, name: 'Teatro Central', latitude: -9.973, longitude: -67.825, address: 'Rua B, 456' }
];

let eventos = [
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
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  if (usuario) {
    res.json({ success: true, user: { id: usuario.id, name: usuario.name, email: usuario.email } });
  } else {
    res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }
});

// Listar eventos
app.get('/eventos', (req, res) => {
  const fullEventos = eventos.map(e => {
    const categoria = categorias.find(c => c.id === e.categoryId);
    const local = locais.find(l => l.id === e.locationId);
    return { ...e, categoria, local };
  });
  res.json(fullEventos);
});

// Cadastrar evento
app.post('/eventos', (req, res) => {
  const novoEvento = { id: eventos.length + 1, ...req.body };
  eventos.push(novoEvento);
  res.json({ success: true, evento: novoEvento });
});

// Listar categorias
app.get('/categorias', (req, res) => res.json(categorias));

// Cadastrar categoria
app.post('/categorias', (req, res) => {
  const novaCategoria = { id: categorias.length + 1, ...req.body };
  categorias.push(novaCategoria);
  res.json({ success: true, categoria: novaCategoria });
});

// Listar locais
app.get('/locais', (req, res) => res.json(locais));

// Cadastrar local
app.post('/locais', (req, res) => {
  const novoLocal = { id: locais.length + 1, ...req.body };
  locais.push(novoLocal);
  res.json({ success: true, local: novoLocal });
});

// Perfil do usuário
app.get('/perfil/:id', (req, res) => {
  const usuario = usuarios.find(u => u.id == req.params.id);
  if (usuario) {
    res.json({ id: usuario.id, name: usuario.name, email: usuario.email });
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// ===== INICIAR SERVIDOR =====
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

