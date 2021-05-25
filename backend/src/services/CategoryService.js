const Category = require('../models/Category')

const createCategory = (categoryData, callback) => {

    var data = new Category();
    data.categoryName = categoryData.categoryName;
    data.categoryColor = categoryData.categoryColor;
    data.categoryAuthor = categoryData.categoryAuthor;
    data.save(function(err, doc) {
        callback(true);
    })

}

exports.createCategory = createCategory;