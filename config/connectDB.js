//import mongoose
const mongoose = require('mongoose')

//fonction qui  va permettre la connexion a ma BD
const connectDB = async () => {
    try {
        //il va essayer de me connecter
       
        //connexion BD @ Local avec MongoCompass
        // await mongoose.connect("mongodb://localhost:27017/utilisateurcarter");

        //connexion distant @ MongoDB Atlas
        await mongoose.connect(process.env.DB_URI);
        console.log('BD connectée')
        
    } catch (error) {
        //dans le cas d'erreur
        console.log('BD non connectée')
      
    }
}
module.exports = connectDB;