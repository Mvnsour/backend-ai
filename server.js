import express from "express";

const app = express();
const PORT = 3000;

// Middleware pour vérifier si le serveur est en cours d'exécution
app.use(express.json());
// Temporary in-memory database
let users = [
  {
    id: 1,
    name: "Bob",
    age: 20,
    city: "Paris",
  },
  {
    id: 2,
    name: "Max",
    age: 25,
    city: "Lyon",
  },
  {
    id: 3,
    name: "Tom",
    age: 30,
    city: "Caen",
  },
];

// --- Handlers ---

// Confirms the server is running
const isServerRunning = (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running successfully",
  });
};

// Returns the full list of users
const getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// --- Routes ---

app.get("/", isServerRunning);
app.get("/users", getAllUsers);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
