//import de mongoose
const mongoose = require('mongoose')

//definition du schéma
const personSchema = new mongoose.Schema({

name: {
    type: String,
    required: true,
},

age: Number,
favoriteFoods: [String],

});

// creation du modele
const Person = mongoose.model("person", personSchema);
module.exports = Person;