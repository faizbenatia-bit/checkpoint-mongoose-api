// Importation de Mongoose
const mongoose = require("mongoose");

// Création du schéma User
const userSchema = new mongoose.Schema(
    {
        // Nom de l'utilisateur
        name: {
            type: String,
            required: true,
            trim: true
        },

        // Email de l'utilisateur
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        // Âge de l'utilisateur
        age: {
            type: Number,
            required: true
        }
    },
    {
        // Ajoute automatiquement createdAt et updatedAt
        timestamps: true
    }
);

// Création du modèle User
const User = mongoose.model("User", userSchema);

// Exportation du modèle
module.exports = User;