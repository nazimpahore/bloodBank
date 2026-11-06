import { connectDB } from '../config/db.js';
import bcrypt from 'bcryptjs';
import Hospital from '../models/Hospital.js';
import Receiver from '../models/Receiver.js';
import BloodInfo from '../models/BloodInfo.js';
import BloodDInfo from '../models/BloodDInfo.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodDonate from '../models/BloodDonate.js';

export const clearDatabase = async () => {
  try {
    console.log('🧹 Clearing all demo data and accounts from database...');
    await Hospital.deleteMany({});
    await Receiver.deleteMany({});
    await BloodInfo.deleteMany({});
    await BloodDInfo.deleteMany({});
    await BloodRequest.deleteMany({});
    await BloodDonate.deleteMany({});
    console.log('✅ Database is now completely clean with 0 demo records.');
  } catch (err) {
    console.error('❌ Clearing database failed:', err);
  }
};

export const seedDatabase = async () => {
  // Demo auto-seeding is disabled by default.
  // New accounts registered via UI or seed will automatically be hashed with bcrypt.
};

// If run standalone via `npm run seed` or `node seed/seedData.js`
if (process.argv[1]?.endsWith('seedData.js')) {
  (async () => {
    await connectDB();
    await clearDatabase();
    process.exit(0);
  })();
}
