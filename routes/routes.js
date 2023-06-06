const express = require('express');
const bodyParser = require('body-parser');
const Model = require('../model/model');
const router = express.Router()
    //const router = require('../index');
module.exports = router;

router.use(bodyParser.json())
router.post('/post', async(req, res) => {
    const data = new Model({
            email: req.body.email,
            password: req.body.password
        })
        // const dataToSave = await data.save(); // res.jason(dataToSave);
    try {
        const dataToSave = await data.save();
        res.json(dataToSave);
        // res.status(200).json(dataToSave)
    } catch (error) {
        res.json(error);
        //res.status(400).json({ message: error.message })
    }
})
router.get('/getAll', async(req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/update/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/delete/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const data = await Model.findByIdAndDelete(id)
        res.send(`Document with ${data.email} has been deleted..`)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})