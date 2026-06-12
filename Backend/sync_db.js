require('dotenv').config();
const { sequelize } = require('./models');

async function sync() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced successfully with alter: true");
  } catch (err) {
    console.error("Error syncing DB:", err);
  } finally {
    process.exit();
  }
}

sync();
