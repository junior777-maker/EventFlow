const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// ===== DADOS SIMULADOS =====
let users = [
  { id: 1, email: "admin", password: "123", name: "Administrador" },
];

let categories = [
  { id: 1, name: "Música" },
  { id: 2, name: "Teatro" },
];

let locations = [
  { id: 1, name: "Estádio", lat: -15.7801, lng: -47.9292 },
  { id: 2, name: "Praça Central", lat: -15.7942, lng: -47.8822 },
];

let events = [
  {
    id: 1,
    name: "Show de Rock",
    description: "Um show incrível de rock",
    date: "20/10/2025",
    price: 100,
    categoryId: 1,
    locationId: 1,
    image: "https://via.placeholder.com/150",
  },
];

// ===== ROTAS =====

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user });
  } else {
    res.status(401).json({ success: false, message: "Usuário ou senha incorretos" });
  }
});

// ===== CATEGORIAS =====
app.get("/categories", (req, res) => res.json(categories));

app.post("/categories", (req, res) => {
  const { name } = req.body;
  const newCat = { id: categories.length + 1, name };
  categories.push(newCat);
  res.json(newCat);
});

// ===== LOCAIS =====
app.get("/locations", (req, res) => res.json(locations));

app.post("/locations", (req, res) => {
  const { name, lat, lng } = req.body;
  const newLoc = { id: locations.length + 1, name, lat, lng };
  locations.push(newLoc);
  res.json(newLoc);
});

// ===== EVENTOS =====
app.get("/events", (req, res) => {
  // juntar categoria e local
  const fullEvents = events.map((e) => {
    const category = categories.find((c) => c.id === e.categoryId);
    const location = locations.find((l) => l.id === e.locationId);
    return { ...e, category: category?.name, location };
  });
  res.json(fullEvents);
});

app.post("/events", (req, res) => {
  const { name, description, date, price, categoryId, locationId, image } = req.body;
  const newEvent = { id: events.length + 1, name, description, date, price, categoryId, locationId, image };
  events.push(newEvent);
  res.json(newEvent);
});

// ===== START SERVER =====
app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
