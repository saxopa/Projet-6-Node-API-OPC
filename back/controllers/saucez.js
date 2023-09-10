const Sauce = require('../models/Sauce');


//Affichage de toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(500).json({error}));

};

// affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch((error) => res.status(404).json({ error }));
  };
//Créaion d'une sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    delete sauceObject._id
    let sauce = new Sauce({
        ...sauceObject,
        //J'ajoute l'url de l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    sauce
    .save()
    .then(() => res.status(201).json({message: 'Objet enregistré !'}))
    .catch((error) => res.status(400).json({error}));
}  



