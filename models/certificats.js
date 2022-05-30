const mongoose = require('mongoose');
const joi = require('joi');

let certificats_schema = new mongoose.Schema({
    partenaire : {
        type : String,
        required : true
    },
    nom : {
        type : String,
        required : true
    }
});

let validation_certif = joi.object({
    partenaire : joi.string().required(),
    nom : joi.string().required()
});

let certif = mongoose.model('certif', certificats_schema);

module.exports.certif = certif;
module.exports.validation_certif = validation_certif;