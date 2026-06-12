const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PageContent = sequelize.define("PageContent", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    pageKey: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // e.g., 'home_hero', 'about_us'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {}
    }
  });

  return PageContent;
};
