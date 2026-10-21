import express from "express";

const app = express();
const PORT = 3000;

// Middleware pour vérifier si le serveur est en cours d'exécution
app.use(express.json());

const isServerRunning = (req, res) => {
  res.json({
    status: "ok",
    message: "Le serveur est lancé avec succès ",
  });
};

// Route principale : confirme que le serveur répond
app.use("/", isServerRunning);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
