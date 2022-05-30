const router = require('express').Router();
const {certif, validation_certif} = require('../models/certificats');

//add certif by admin
router.post('/add', async (req, res, next) =>{
    try {
        let results = validation_certif.validate(req.body);
        if(results.error)
            return res.status(400).json({
                "error1" : results.error.details[0].message
            });
        let certife = new certif(req.body);
        await certife.save();
        res.json({
            "certif_added" : certife
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
        let certife = await certif.findByIdAndRemove(req.params.id);
        if(! certife)
            return res.status(404).send('Certif with this ID not found');
        res.json({
            "certif_deleted" : certife
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
        let certifs = await certif.find();
        res.json({
            "all_certifs" : certifs
        });
    } catch (error) {
        res.status(400).send('Error Getting certifs :',error.message);
    }
});

module.exports = router;