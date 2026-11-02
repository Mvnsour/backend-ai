import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/usersController.js";

const router = Router();

// Paths are relative to the mount point ("/users" in server.js)
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// POST is used to create a new resource, in this case a user
router.post("/", createUser);

// PUT replaces the whole resource identified by the id
router.put("/:id", updateUser);

// DELETE removes the resource identified by the id
router.delete("/:id", deleteUser);

export default router;
