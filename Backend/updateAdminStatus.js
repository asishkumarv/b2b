require('dotenv').config();
const { User } = require('./models');

(async () => {
  try {
    const [updatedRows] = await User.update(
      { status: 'approved' }, 
      { where: { role: 'admin' } }
    );
    console.log(`Successfully updated ${updatedRows} admin(s) to 'approved' status.`);
    process.exit(0);
  } catch (err) {
    console.error("Error updating admin status:", err);
    process.exit(1);
  }
})();
