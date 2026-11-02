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

// Creates a new user from the JSON body
export const createUser = (req, res) => {
  // req.body is undefined when the Content-Type header is not JSON
  const { name, age, city } = req.body ?? {};

  // Minimal manual check: the three fields are required
  if (!name || age === undefined || !city) {
    return res.status(400).json({
      message: "Fields name, age and city are required",
    });
  }

  // The id is generated here, like a database would
  const nextId =
    users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

  const newUser = {
    id: nextId,
    name,
    age: Number(age),
    city,
  };

  // push mutates the array, it never reassigns the imported binding
  users.push(newUser);

  res.status(201).json(newUser);
};

// Deletes a user by id
export const deleteUser = (req, res) => {
  const id = Number(req.params.id);

  // findIndex returns the position in the array, or -1 when there is no match
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `User with id ${id} not found`,
    });
  }

  // splice removes in place and returns an array of the removed items
  const [deletedUser] = users.splice(index, 1);

  res.status(200).json(deletedUser);
};

// Replaces a user: PUT expects the three fields, not a partial payload
export const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const { name, age, city } = req.body ?? {};

  // Cheap check first: no need to search the array for an invalid body
  if (!name || age === undefined || !city) {
    return res.status(400).json({
      message: "Fields name, age and city are required",
    });
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: `User with id ${id} not found`,
    });
  }

  // The id comes from the URL and never changes: it identifies the resource
  const updatedUser = {
    id,
    name,
    age: Number(age),
    city,
  };

  // Replacing one slot mutates the array, it never reassigns the binding
  users[index] = updatedUser;

  res.status(200).json(updatedUser);
};
