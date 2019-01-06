const Models = require(__basedir + '\\data_access\\sequelize').Models

module.exports = (req, res) => {
    Models.Portfolio.findOne({
        where: { PortfolioId: req.params.id },
        include: [{
            all: true,
            nested: true,
        }]
    })
    .then((results) => {
        res.render('portfolio', { Portfolio: results })
    })
}