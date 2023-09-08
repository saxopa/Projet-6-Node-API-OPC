const Sauce = require('../models/Sauce');

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(500).json({error}));

};

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce)
    .then(sauce => {
        let sauce = new Sauce({
            ...sauceObject,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        sauce.save()
    .catch(error => res.status(400).json({error}));
})
}
