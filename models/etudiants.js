const mongoose = require('mongoose');
const joi = require("joi");

let etudiant_schema = new mongoose.Schema({
    nom : {
        type : String,
        required : true
    },
    prenom : {
        type : String,
        required : true
    },
    num_carte_etud : {
        type : Number,
        maxlength : 8,
        minlength : 8,
        required : true,
    },
    class : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
});

let validation_etudiant = joi.object({
    nom : joi.string().required(),
    prenom : joi.string().required(),
    num_carte_etud : joi.number().min(00000000).max(99999999).required(),
    class : joi.string().required(),
    password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    repeat_password : joi.ref('password')
});

let validation_login = joi.object({
    nom : joi.string().required(),
    password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

let etudiant = mongoose.model('etudiant', etudiant_schema);

module.exports.etudiant = etudiant;
module.exports.validation_etudiant = validation_etudiant;
module.exports.validation_login = validation_login;