import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/usersController.js";

const router = Router();

// Paths are relative to the mount point ("/users" in server.js)
router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
