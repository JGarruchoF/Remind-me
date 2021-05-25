const { Router, query } = require('express');
const router = Router();
const bodyParser = require('body-parser');

const Category = require('../models/Category');
const CategoryService = require('../services/CategoryService');

router.get('/api/getCategories/:userId', async (req, res) => {
    let categoryQuery = await Category.find({ categoryAuthor: req.params.userId }).exec();
    if (!categoryQuery.length) {
        res.json('Category not found').status(404);
    } else {
        res.json({ categories: categoryQuery }).status(200);
    }
});


router.post('/api/createCategory', bodyParser.json(), async (req, res) => {

    var data = new Category();

    data.categoryName = req.body.categoryName;
    data.categoryColor = req.body.categoryColor;
    data.categoryAuthor = req.body.categoryAuthor;

    CategoryService.createCategory(data, (created) => {
        if (!created) {
            res.json("La categoria no ha sido creada").status(400);
        } else {
            res.json("La categoria ha sido creada").status(200);
        }
    });

})


router.patch('/api/modifyCategory/:categoryId', bodyParser.json(), async (req, res) => {
    console.log("HOLAAA")

    let categoryQuery = { categoryId: req.params.categoryId }

    Category.findOneAndUpdate(categoryQuery, req.body, { upsert: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Modificado correctamente.');
    });

})

router.delete('/api/removeCategory/:categoryId', async (req, res) => {

    let categoryQuery = { categoryId: req.params.categoryId }

    Category.findOneAndDelete(categoryQuery, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Borrado correctamente.');
    });

})


module.exports = router;