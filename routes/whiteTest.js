const router = require('express').Router();
const {whiteTest, validation_whiteTest} = require('../models/whiteTest');
const {etudiant} = require('../models/etudiants');
const {certif} = require('../models/certificats')

//add whiteTest
router.post('/add', async (req, res, next) =>{
    try {
        let results = validation_whiteTest.validate(req.body);
        if(results.error)
            return res.status(400).json({
                "error1" : results.error.details[0].message
            });
        let etudiants = await etudiant.findById(req.body.participant);
        if(!etudiants)
            return res.status(404).send('Etudiant id is not found');
        let certifs = await certif.findById(req.body.certif);
        if(!certifs)
            return res.status(404).send('Certificate id is not found');
        req.body.participant ={
            nom : etudiants.nom+' '+etudiants.prenom,
            id : etudiants._id
        };
        req.body.certif = {
            nom : certifs.partenaire+' '+certifs.nom,
            id : certifs._id
        };
        let d = new Date();
        let dates = [];
        for(let i=0; i<4; i++) {
            d.setDate(d.getDate()+1);
            if(d.getDay() == 3 || d.getDay() == 6) {
                dates.push(new Date(d));
            }
        }
        /*res.json({
            "dates_disponible" : dates
        })*/
        let whiteTeste = new whiteTest(req.body);
        whiteTeste.set("date_test", dates[0].toDateString() + ' 14:00');
        await whiteTeste.save();
        res.json({
            "whiteTest_added" : whiteTeste
        });
        
    } catch (error) {
        res.status(400).json({
            "error2" : error.message
        });
    }
});

//delete certif by admin
router.delete('/delete/:id', async (req, res, next) =>{
    try {
        let whiteTeste = await whiteTest.findByIdAndRemove(req.params.id);
        if(! certife)
            return res.status(404).send('Certif with this ID not found');
        res.json({
            "whiteTest_deleted" : whiteTeste
        });
    } catch (error) {
        res.status(400).json({
            "error2" : error.message
        });
    }
});

//get all certif
router.get("/", async (req, res, next) => {
    try {
        let whiteTests = await whiteTest.find();
        res.json({
            "all_whiteTests" : whiteTests
        });
    } catch (error) {
        res.status(400).send('Error Getting certifs :',error.message);
    }
});

module.exports = router;