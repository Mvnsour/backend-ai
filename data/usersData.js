// Temporary in-memory database
// Mutate this array (push, splice) but never reassign it: an imported
// binding is read-only, so "users = ..." would throw in another module
export const users = [
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
