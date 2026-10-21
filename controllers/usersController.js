import { users } from "../data/usersData.js";

// Returns all users, optionally filtered by one or more cities
// Accepts ?city=Paris, ?city=Paris&city=Caen and ?city=Paris,Caen
export const getAllUsers = (req, res) => {
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
export const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: `User with id ${id} not found`,
    });
  }

  res.status(200).json(user);
};
