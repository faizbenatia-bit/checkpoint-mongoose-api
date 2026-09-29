// Importation de Mongoose
const mongoose = require("mongoose");

// Fonction permettant de connecter l'application à MongoDB
const connectDB = async () => {
    try {
        // Connexion à MongoDB grâce à la variable MONGO_URI
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connecté avec succès");
    } catch (error) {
        // Affichage de l'erreur en cas d'échec
        console.error("Erreur de connexion à MongoDB :", error.message);

        // Arrêt de l'application
        process.exit(1);
    }
};

// Exportation de la fonction
module.exports = connectDB;