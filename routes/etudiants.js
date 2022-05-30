const router = require('express').Router();
const {etudiant, validation_etudiant, validation_login} = require('../models/etudiants');
const bcrypt = require('bcrypt');

//add etudiant
router.post('/add', async (req, res, next) =>{
    try {
        let results = validation_etudiant.validate(req.body);
        if(results.error)
            return res.status(400).json({
                "error1" : results.error.details[0].message
            });
        let etudiants = new etudiant(req.body);
        //hash password
        let salt = await bcrypt.genSalt(10);
        console.log('Salt: ',salt);
        etudiants.password = await bcrypt.hash(etudiants.password, salt);
        console.log(": ", etudiants.password)
        await etudiants.save();
        res.json({
            "etudiant_added" : etudiants
        });
        
    } catch (error) {
        res.status(400).json({
            "error2" : error.message
        });
    }
});

//signin
router.post('/signin', async (req, res, next) => {
    let results = validation_login.validate(req.body);
    if(results.error)
        return res.status(400).json({
            'error': results.error.details[0].message
        });
    if(req.body.nom == "admin" && req.body.password == "admin")
        return res.status(200).json({
            "message" : " Admin signin successfully"
        })
    let etudiants = await etudiant.findOne({nom : req.body.nom});
    if(!etudiants)
        return res.status(400).json({
            'message': "nom or password is incorrect"
        });
    let passwd = await bcrypt.compare(req.body.password, etudiants.password);
    if(!passwd)
        return res.status(400).json({
            'message': "nom or password is incorrect"
        });
    res.status(200).json({
        "message" : "etudiant signin successfully"
    });
});

//delete certif by admin
router.delete('/delete/:id', async (req, res, next) =>{
    try {
        let etudiants = await etudiant.findByIdAndRemove(req.params.id);
        if(! etudiants)
            return res.status(404).send('etudiant with this ID not found');
        res.json({
            "etudiant_deleted" : etudiants
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
        let etudiants = await etudiant.find();
        res.json({
            "etudiants" : etudiants
        });
    } catch (error) {
        res.status(400).send('Error Getting certifs :',error.message);
    }
});


module.exports = router;