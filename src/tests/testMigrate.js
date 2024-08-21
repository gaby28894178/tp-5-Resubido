require('../models')
const sequelize = require('../utils/connection');


const testMigrate = async () => {
    try {
        sequelize.sync({ force: true });
        console.log("DB connected ✅");
        process.exit()
    } catch (e) {
        console.log(e)
    }
}

testMigrate();
