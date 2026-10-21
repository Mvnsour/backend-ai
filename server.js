import express from "express";

const app = express();
const PORT = 3000;

// Middleware: parses incoming JSON request bodies into req.body
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

// Returns all users, optionally filtered by one or more cities
// Accepts ?city=Paris, ?city=Paris&city=Caen and ?city=Paris,Caen
const getAllUsers = (req, res) => {
  // Reads the "city" value from the query string
  const { city } = req.query;

  // No filter: return the whole collection
  if (!city) {
    return res.status(200).json(users);
  }

  // One city gives a string, several give an array: normalize to an array
  const rawCities = Array.isArray(city) ? city : [city];

  // Splits "Paris,Caen", trims spaces, lowercases, drops empty values
  const wantedCities = rawCities
    .flatMap((value) => value.split(","))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  // Keeps only the users whose city is in the wanted list
  const filteredUsers = users.filter((user) =>
    wantedCities.includes(user.city.toLowerCase()),
  );

  res.status(200).json(filteredUsers);
};

// Returns a single user by id
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: `User with id ${id} not found`,
    });
  }

  res.status(200).json(user);
};

// --- Routes ---

app.get("/", isServerRunning);
app.get("/users", getAllUsers);
app.get("/users/:id", getUserById);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
