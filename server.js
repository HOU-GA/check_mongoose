//import dexpress
const express = require ('express')

//instance express
const app = express()

//import dotenv
require('dotenv').config()

//middleware


//connexion a la BD
const connectDB = require('./config/connectDB')
const Person = require('./models/Person')
connectDB()

//Partie creation (create)
const newPerson = {
    name:"aaaa",
    age: 20,
    favoriteFoods: ["pate", "pizza"],
};


//*****************insertion 1 par 1 (chaque fois en change les données du personne****************** */
//fonction d'insertion une seul document
async function createPersonne(newP){
    try {
        //creer un document dans la collection person
        const nouvelleP = new Person(newP)
        //enregistrer dans la BD
        await nouvelleP.save();
        console.log("la personne est crée avec succees", nouvelleP)
    } catch (error) {
        console.log("echec creation", error)
        
    }
}
//appel fonction pour la creer reelement le doc continu aaa (personne)
//createPersonne(newPerson)
/*********************fin insertion 1 par 1****************************************************************************/

/************************Creation du plusieurs personnes au meme temp******************************************** */

const tablePerson = [
    {
        name:"bbb",
        age: 20,
        favoriteFoods: ["pate", "pizza"],
    },

    {
        name:"ccc",
        age: 20,
        favoriteFoods: ["pate", "pizza"],
    },

];
async function insertPlusieurs(arr){
    try {
        const personToInsert = await Person.insertMany(arr);
        console.log("la liste des personnes est inséréee avec succés", personToInsert)
    } catch (error) {
        console.log("echec d'insertion liste personnes", error)
        
    }
}
// appel de la fonction 
//insertPlusieurs(tablePerson);

/******************************Fin creation plusieurs pers ****************************************** */

//ٌRecherche dans la B.D (Read)

async function listePerson(){
    try {
        const personList = await Person.find();
        console.log("liste de toutes les personnes", personList)
    } catch (error) {
        console.log("echec de lecture", error)
    }
}
//listePerson();

// Recherche dans la B.D par Id
async function rechercheID(id){
    try {
        const personId = await Person.findById(id);
        console.log("la personne recherchée par Id:", personId);
    } catch (error) {
        console.log("echec recherche", error)
        
    }
}
//rechercheID("68b0144fa01ac5c06d23876a");


//*************************************************************** */

//Partie edition (Update)
async function miseAjourAge(id, age){
    try {
        const personMaj = await Person.findByIdAndUpdate(
            id,
            {$set: {age : age} },
            {new : true}
        );
        console.log("age mise a jour avec succés");
    } catch (error) {
        console.log("impossible de mettre a jour age", error)
        
    }
}
//miseAjourAge("68b0144fa01ac5c06d23876a", 30);
async function miseAjourFood(id, food){
    try {
        const personAmj = await Person.findByIdAndUpdate(
            id,
            {$push : {favoriteFoods : food}},
            {new : true}

        );
        console.log("le plat est rajoutée correctement au tableau", personAmj)
    } catch (error) {
        console.log("echec ajout plat dans le tableau", error)
    }
}
//miseAjourFood("68b0144fa01ac5c06d23876a","Payla");

//Suppression (Delete)
async function suppressionPerson(id){
    try {
        const personSup = await Person.findByIdAndDelete(id)
        console.log(personSup)
        if (!personSup) return console.log('not found')
        console.log("Suppression effectuée", personSup)
    } catch (error) {
        console.log("echec Suppression")
        
    }
}
//suppressionPerson("68b0147273a29777673e7908");

//Routes
app.get('/', (req, res) => {
    res.end('Bonjour')
})

//recherche plus raffinée (aggregat)
async function rechercheEnChaine(){
    try {
        const resultat = await Person.find({favoriteFoods:"pate"})
        .sort("name")
        .limit(4)
        .select("-age")
        .exec();
        console.log("Resultat de recherche est:", resultat)
    } catch (error) {
        console.log("echec recherche en chaine", error)
    }
}
rechercheEnChaine();


//PORT
const PORT = process.env.PORT || 3400

//le serveur
app.listen(PORT, (err) => {
    err ? console.error('Ya un probleme:', err) : console.log(`le console est a lecoute sur le port: http://localhost:${PORT}`)
})