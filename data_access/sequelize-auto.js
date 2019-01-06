var SequelizeAuto = require('sequelize-auto')

module.exports = new SequelizeAuto('MSRDatabase', 'Ikkatosh2323', 'Password1_', {
    host: '100568977azure.database.windows.net',
    dialect: 'mssql',
    directory: __dirname + '\\models', // false prevents the program from writing to disk
    //port: 'port',
    additional: { timestamps: false, freezeTableName: true},
    tables: ['Portfolio','LifeStage','Slide','Content','MediaType','Multimedia'],
    dialectOptions: {
        encrypt: true
    }
})


