//import dexpress
const express = require ('express')

//instance express
const app = express()

//import dotenv
require('dotenv').config()

//middleware


//connexion a la BD
const connectDB = require('./config/connectDB')
connectDB()

//PORT
const PORT = process.env.PORT || 3400

//le serveur
app.listen(PORT, (err) => {
    err ? console.error('Ya un probleme:', err) : console.log(`le console est a lecoute sur le port: http://localhost:${PORT}`)
})