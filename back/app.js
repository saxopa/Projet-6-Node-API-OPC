const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');


//Connexion à Mongo DB Atlas
mongoose.connect(
  process.env.SECRET_DB,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//Equivalent de BodyParser
app.use(express.json()); 

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//create images file if doesnt exist
if (!fs.existsSync('./images')) {
  fs.mkdirSync('./images');
}

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));


module.exports = app;