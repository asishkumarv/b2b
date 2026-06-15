const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: process.env.DATABASE_URL.includes("sslmode=require") ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {}
});

const User = require("./User")(sequelize);
const PageContent = require("./PageContent")(sequelize);
const Blog = require("./Blog")(sequelize);
const Enquiry = require("./Enquiry")(sequelize);

User.hasMany(Enquiry, { foreignKey: 'assignedTo' });
Enquiry.belongsTo(User, { as: 'staff', foreignKey: 'assignedTo' });

module.exports = {
  sequelize,
  User,
  PageContent,
  Blog,
  Enquiry
};
