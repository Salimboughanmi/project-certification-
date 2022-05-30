const mongoose = require('mongoose');
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi)

let whiteTest_schema = new mongoose.Schema({
    participant : {
        nom : String,
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'etudiants'
        }
    },
    certif : {
        nom : String,
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'certificats'
        }
    },
    date_test : {
        type : String,
    }
});

let validation_whiteTest = joi.object({
    participant : joi.objectId().required(),
    certif : joi.objectId().required(),
    date_test : joi.string()
});

let whiteTest = mongoose.model('whiteTest', whiteTest_schema);

module.exports.whiteTest = whiteTest;
module.exports.validation_whiteTest = validation_whiteTest;