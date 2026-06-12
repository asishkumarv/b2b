const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Enquiry = sequelize.define("Enquiry", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Contact Form" // 'Popup Form' or 'Contact Form'
    }
  });

  return Enquiry;
};
