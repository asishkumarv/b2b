require("dotenv").config();
const { sequelize } = require("./models");

async function addPhoneColumn() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    const queryInterface = sequelize.getQueryInterface();
    
    // Describe the table to check if the column already exists
    const tableInfo = await queryInterface.describeTable('Enquiries');
    
    if (!tableInfo.phone) {
      console.log("Adding 'phone' column to Enquiries table...");
      await queryInterface.addColumn('Enquiries', 'phone', {
        type: require("sequelize").DataTypes.STRING,
        allowNull: true,
      });
      console.log("✅ Successfully added 'phone' column!");
    } else {
      console.log("✅ 'phone' column already exists in Enquiries table.");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to add column:", error);
    process.exit(1);
  }
}

addPhoneColumn();
