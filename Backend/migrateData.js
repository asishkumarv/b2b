const { Sequelize, DataTypes } = require("sequelize");

const OLD_DB_URL = "postgresql://neondb_owner:npg_Msd8xIv7DWXn@ep-gentle-rain-ao7ept5r-pooler.c-2.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
const NEW_DB_URL = "postgresql://b2buser:Strivenestb2bPassword7869@localhost:5432/b2bdb";

// 1. Initialize OLD connection
const oldSequelize = new Sequelize(OLD_DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
});

// 2. Initialize NEW connection
const newSequelize = new Sequelize(NEW_DB_URL, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {} // VPS doesn't use SSL based on previous errors
});

// 3. Define Models (Helper to bind to any sequelize instance)
const initModels = (seq) => {
  const User = seq.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }
  });

  const PageContent = seq.define("PageContent", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    pageKey: { type: DataTypes.STRING, allowNull: false, unique: true },
    title: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    imageUrl: { type: DataTypes.TEXT, allowNull: true },
    data: { type: DataTypes.JSONB, allowNull: true, defaultValue: {} }
  });

  const Blog = seq.define("Blog", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: true, defaultValue: "Admin" },
    imageUrl: { type: DataTypes.TEXT, allowNull: true }
  });

  const Enquiry = seq.define("Enquiry", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    message: { type: DataTypes.TEXT, allowNull: false },
    source: { type: DataTypes.STRING, defaultValue: "Contact Form" }
  });

  return { User, PageContent, Blog, Enquiry };
};

const OldModels = initModels(oldSequelize);
const NewModels = initModels(newSequelize);

async function migrateData() {
  try {
    console.log("Connecting to databases...");
    await oldSequelize.authenticate();
    console.log("✅ Connected to OLD Database (Neon)");
    
    await newSequelize.authenticate();
    console.log("✅ Connected to NEW Database (VPS)");

    console.log("\nSyncing tables on NEW Database...");
    await newSequelize.sync({ alter: true });
    console.log("✅ Tables created/updated successfully.");

    // Function to migrate a specific table
    const migrateTable = async (modelName, OldModel, NewModel) => {
      console.log(`\nMigrating ${modelName}...`);
      const records = await OldModel.findAll({ raw: true });
      if (records.length === 0) {
        console.log(`No records found in ${modelName}. Skipping.`);
        return;
      }
      
      console.log(`Found ${records.length} records. Inserting into new DB...`);
      await NewModel.bulkCreate(records, { ignoreDuplicates: true });
      console.log(`✅ ${modelName} migration complete!`);
    };

    await migrateTable("Users", OldModels.User, NewModels.User);
    await migrateTable("PageContent", OldModels.PageContent, NewModels.PageContent);
    await migrateTable("Blogs", OldModels.Blog, NewModels.Blog);
    await migrateTable("Enquiries", OldModels.Enquiry, NewModels.Enquiry);

    console.log("\n🎉 Migration finished successfully!");
    process.exit(0);

  } catch (error) {
    console.error("\n❌ Migration failed:", error);
    process.exit(1);
  }
}

migrateData();
