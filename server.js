import express from "express";
import usersRouter from "./routers/usersRouter.js";

const app = express();
const PORT = 3000;

// Parses incoming JSON request bodies into req.body
app.use(express.json());

// Confirms the server is running
const confirmServerRunning = (req, res) => {
  res.json({
    status: "ok",
    message: "Server is running successfully",
  });
};

// --- Routes ---

app.get("/", confirmServerRunning);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
