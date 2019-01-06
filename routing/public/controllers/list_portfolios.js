const Models = require(__basedir + '\\data_access\\sequelize').Models

module.exports = (req, res) => {
    Models.Portfolio.findAll()
        .then((results) => {
            res.render('list_portfolios', { Portfolios: results })
        })
}