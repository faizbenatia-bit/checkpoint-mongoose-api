// Importation d'Express
const express = require("express");

// Importation de dotenv
const dotenv = require("dotenv");

// Importation de la fonction de connexion MongoDB
const connectDB = require("./config/db");

// Importation du modèle User
const User = require("./models/User");

// Chargement des variables du fichier .env
dotenv.config();

// Connexion à MongoDB
connectDB();

// Création de l'application Express
const app = express();

// Middleware permettant de recevoir du JSON
app.use(express.json());


// ======================================================
// GET : récupérer tous les utilisateurs
// ======================================================

app.get("/api/users", async (req, res) => {
    try {

        // Récupération de tous les utilisateurs
        const users = await User.find();

        // Retourner les utilisateurs au format JSON
        res.status(200).json(users);

    } catch (error) {

        // Gestion des erreurs
        res.status(500).json({
            message: "Erreur lors de la récupération des utilisateurs",
            error: error.message
        });
    }
});


// ======================================================
// POST : créer un nouvel utilisateur
// ======================================================

app.post("/api/users", async (req, res) => {
    try {

        // Récupération des données envoyées par le client
        const { name, email, age } = req.body;

        // Création d'un nouvel utilisateur
        const user = new User({
            name,
            email,
            age
        });

        // Sauvegarde dans MongoDB
        const savedUser = await user.save();

        // Retourner l'utilisateur créé
        res.status(201).json(savedUser);

    } catch (error) {

        // Gestion des erreurs
        res.status(400).json({
            message: "Erreur lors de la création de l'utilisateur",
            error: error.message
        });
    }
});


// ======================================================
// PUT : modifier un utilisateur
// ======================================================

app.put("/api/users/:id", async (req, res) => {
    try {

        // Récupération de l'ID depuis l'URL
        const { id } = req.params;

        // Recherche et modification de l'utilisateur
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        // Vérifier si l'utilisateur existe
        if (!updatedUser) {
            return res.status(404).json({
                message: "Utilisateur non trouvé"
            });
        }

        // Retourner l'utilisateur modifié
        res.status(200).json(updatedUser);

    } catch (error) {

        // Gestion des erreurs
        res.status(400).json({
            message: "Erreur lors de la modification",
            error: error.message
        });
    }
});


// ======================================================
// DELETE : supprimer un utilisateur
// ======================================================

app.delete("/api/users/:id", async (req, res) => {
    try {

        // Récupération de l'ID depuis l'URL
        const { id } = req.params;

        // Suppression de l'utilisateur
        const deletedUser = await User.findByIdAndDelete(id);

        // Vérifier si l'utilisateur existe
        if (!deletedUser) {
            return res.status(404).json({
                message: "Utilisateur non trouvé"
            });
        }

        // Retourner un message de confirmation
        res.status(200).json({
            message: "Utilisateur supprimé avec succès",
            user: deletedUser
        });

    } catch (error) {

        // Gestion des erreurs
        res.status(400).json({
            message: "Erreur lors de la suppression",
            error: error.message
        });
    }
});


// ======================================================
// Démarrage du serveur
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});