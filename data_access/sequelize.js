const Sequelize = require('sequelize');

//INITIALISATION
const db = new Sequelize('MSRDatabase', 'Ikkatosh2323', 'Password1_', {
    host: '100568977azure.database.windows.net',
    dialect: 'mssql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000 
    },
    dialectOptions: {
        encrypt: true
    },
    define: {
        timestamps: true,
        freezeTableName: false
    }
});

//TEST CONNECTION
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

//CONSOLIDATE MODELS FROM FOLDER
const Models = {
    Content: db.import(__dirname + '\\models\\Content'),
    Lifestage: db.import(__dirname + '\\models\\Lifestage'),
    MediaType: db.import(__dirname + '\\models\\MediaType'),
    Multimedia: db.import(__dirname + '\\models\\Multimedia'),
    Portfolio: db.import(__dirname + '\\models\\Portfolio'),
    Slide: db.import(__dirname + '\\models\\Slide')
}

/*RELATIONSHIPS
    hasOne: OneToOne (Foreign key on target model)
    belongsTo: *ToOne (Foreign key on source model)
    hasMany: OneToMany (Foreign key on target model)
    belongsToMany: ManyToMany {through: 'join table', foreignKey: 'foreign key'}
*/
//Portfolio <-- Lifestage
Models.Portfolio.hasMany(Models.Lifestage, { as: 'LifeStages', foreignKey: 'PortfolioId', constraints: true })
Models.Lifestage.belongsTo(Models.Portfolio, { as: 'Portfolio', foreignKey: 'PortfolioId', constraints: true })

//Portfolio <-- Multimedia
Models.Portfolio.hasOne(Models.Multimedia, { as: 'Multimedia', foreignKey: 'MultimediaId', constraints: true })
Models.Multimedia.belongsTo(Models.Portfolio, { as: 'Portfolio', foreignKey: 'MultimediaId', constraints: true })

//Multimedia <-- MediaType
Models.MediaType.hasMany(Models.Multimedia, { as: 'Multimedia', foreignKey: 'MediaTypeId', constraints: true })
Models.Multimedia.belongsTo(Models.MediaType, { as: 'MediaType', foreignKey: 'MediaTypeId', constraints: true })

//Slide <-- Lifestage
Models.Lifestage.hasMany(Models.Slide, { as: 'Slides', foreignKey: 'LifeStageId', constraints: true })
Models.Slide.belongsTo(Models.Lifestage, { as: 'Lifestage', foreignKey: 'LifeStageId', constraints: true })

//Content <-- Slide
Models.Slide.hasMany(Models.Content, { as: 'Contents', foreignKey: 'SlideId', constraints: true })
Models.Content.belongsTo(Models.Slide, { as: 'Slide', foreignKey: 'SlideId', constraints: true })

//Content <-- Multimedia
Models.Multimedia.hasOne(Models.Content, { as: 'Contents', foreignKey: 'multimediaId', constraints: true })
Models.Content.belongsTo(Models.Multimedia, { as: 'Multimedia', foreignKey: 'multimediaId', constraints: true })

module.exports = {
    DB: db,
    Models : Models
}