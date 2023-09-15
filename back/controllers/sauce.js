const Sauce = require('../models/Sauce');
const fs = require('fs');

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
    .then((sauce => {
      if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message : 'Not authorized'});
      } else {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({_id: req.params.id})
          .then(()=> { res.status(200).json({message: 'objet supprimé'})})
          .catch(error => res.status(401).json({error}));

    }); 
    }   
    }))
    .catch(error => {
      res.status(500).json({error});
  })
};

 // L'utilisateur peut modifier une sauce qu'il a créée
exports.updateSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id }).then((sauce) => {
      // If the user is changing the image
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        const sauceObject = req.file
          ? {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            }
          : { ...req.body };
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    });
  };

// affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id,
  })
    .then(sauces => {
      res.status(200).json(sauces);
    })
    .catch(error => {
      res.status(404).json({error,
      });
    });
};


exports.getAllSauces = (req, res, next) => {
  Sauce.find()
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({error}));
};

exports.createSauce =  (req, res, next) =>{ 
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  sauce.save()
  .then(()=>{res.status(200).json({message: 'objet enregistré'})})
  .catch(error => {res.status(400).json({error})});
};

exports.likeSauce = (req, res, next) => {
  var like = req.body.like;
  var userId = req.body.userId;
  var sauceId = req.params.id;
  if (like == 1) {
    Sauce.updateOne(
      { _id: sauceId },
      {
        $push: { usersLiked: userId },
        $inc: { likes: +1 },
      }
    )
      .then(() => res.status(200).json({ message: "Like ajouté" }))
      .catch((error) => res.status(400).json({ error }));
  } else if (like == -1) {
    Sauce.updateOne(
      { _id: sauceId },
      {
        $push: { usersDisliked: userId },
        $inc: { dislikes: +1 },
      }
    )
      .then(() => res.status(200).json({ message: "Dislike ajouté" }))
      .catch((error) => res.status(400).json({ error }));
}}