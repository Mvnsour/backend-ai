import { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/usersController.js";

const router = Router();

// Paths are relative to the mount point ("/users" in server.js)
router.get("/", getAllUsers);
router.get("/:id", getUserById);

// POST is used to create a new resource, in this case a user
router.post("/", createUser);

export default router;
