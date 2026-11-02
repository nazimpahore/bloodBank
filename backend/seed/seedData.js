import { connectDB } from '../config/db.js';
import Hospital from '../models/Hospital.js';
import Receiver from '../models/Receiver.js';
import BloodInfo from '../models/BloodInfo.js';
import BloodDInfo from '../models/BloodDInfo.js';
import BloodRequest from '../models/BloodRequest.js';
import BloodDonate from '../models/BloodDonate.js';

export const seedDatabase = async () => {
  try {
    const hospitalCount = await Hospital.countDocuments();
    if (hospitalCount > 0) {
      console.log('ℹ️ Database already contains records. Skipping seed.');
      return;
    }

    console.log('🌱 Seeding database with original LifeDrop records...');

    // Clear existing
    await Hospital.deleteMany({});
    await Receiver.deleteMany({});
    await BloodInfo.deleteMany({});
    await BloodDInfo.deleteMany({});
    await BloodRequest.deleteMany({});
    await BloodDonate.deleteMany({});

    // 1. Seed Hospitals
    const hospitals = await Hospital.create([
      {
        hname: 'Liaquat National Hospital',
        hemail: 'info@lnh.edu.pk',
        hpassword: 'gandhi',
        hphone: '03018234512',
        hcity: 'Karachi',
      },
      {
        hname: 'Civil Hospital (Dr. Ruth Pfau)',
        hemail: 'contact@chk.gov.pk',
        hpassword: 'arunodhaya',
        hphone: '03129845123',
        hcity: 'Karachi',
      },
      {
        hname: 'LUMHS Civil Hospital',
        hemail: 'helpdesk@lumhs.edu.pk',
        hpassword: 'asia47',
        hphone: '03023456789',
        hcity: 'Hyderabad',
      },
      {
        hname: 'Indus Hospital & Health Network',
        hemail: 'badin.campus@tih.org.pk',
        hpassword: 'apollo247',
        hphone: '03332456781',
        hcity: 'Badin',
      },
      {
        hname: 'GMMMC Teaching Hospital',
        hemail: 'info@gmmmc.edu.pk',
        hpassword: 'amaravathi',
        hphone: '03458765432',
        hcity: 'Sukkur',
      },
    ]);

    // 2. Seed Receivers / Donors
    const receivers = await Receiver.create([
      {
        rname: 'Muhammad Ali Khan',
        remail: 'm.ali.khan@gmail.com',
        rpassword: 'test',
        rphone: '03001234567',
        rbg: 'A+',
        rcity: 'Karachi',
      },
      {
        rname: 'Tariq Mehmood Soomro',
        remail: 'tariq.soomro@gmail.com',
        rpassword: 'xyz@47',
        rphone: '03029871234',
        rbg: 'B+',
        rcity: 'Hyderabad',
      },
      {
        rname: 'Zubair Ahmed Memon',
        remail: 'zubair.memon78@gmail.com',
        rpassword: 'rithish',
        rphone: '03134567890',
        rbg: 'B+',
        rcity: 'Sukkur',
      },
      {
        rname: 'Bilal Hussain Shah',
        remail: 'bilal.shah92@gmail.com',
        rpassword: 'akshay74',
        rphone: '03461239874',
        rbg: 'B+',
        rcity: 'Larkana',
      },
      {
        rname: 'Ayesha Siddiqa',
        remail: 'ayesha.siddiqa44@gmail.com',
        rpassword: 'nandhu989',
        rphone: '03348765412',
        rbg: 'AB-',
        rcity: 'Mirpurkhas',
      },
    ]);

    // 3. Seed BloodInfo (Hospital Blood Stock)
    await BloodInfo.create([
      { hospital: hospitals[0]._id, bg: 'A-' },
      { hospital: hospitals[0]._id, bg: 'O+' },
      { hospital: hospitals[0]._id, bg: 'B-' },
      { hospital: hospitals[1]._id, bg: 'A-' },
      { hospital: hospitals[1]._id, bg: 'A+' },
      { hospital: hospitals[1]._id, bg: 'AB+' },
      { hospital: hospitals[2]._id, bg: 'A+' },
      { hospital: hospitals[2]._id, bg: 'B-' },
      { hospital: hospitals[2]._id, bg: 'O-' },
      { hospital: hospitals[2]._id, bg: 'B+' },
      { hospital: hospitals[3]._id, bg: 'O+' },
      { hospital: hospitals[3]._id, bg: 'A-' },
      { hospital: hospitals[3]._id, bg: 'O-' },
      { hospital: hospitals[4]._id, bg: 'A-' },
      { hospital: hospitals[4]._id, bg: 'A+' },
      { hospital: hospitals[4]._id, bg: 'B-' },
      { hospital: hospitals[4]._id, bg: 'B+' },
    ]);

    // 4. Seed BloodDInfo (Voluntary Donor Offerings)
    await BloodDInfo.create([
      { receiver: receivers[0]._id, bg: 'A+' },
      { receiver: receivers[0]._id, bg: 'B-' },
      { receiver: receivers[0]._id, bg: 'A-' },
      { receiver: receivers[1]._id, bg: 'B+' },
      { receiver: receivers[1]._id, bg: 'O+' },
      { receiver: receivers[2]._id, bg: 'B+' },
      { receiver: receivers[2]._id, bg: 'B-' },
      { receiver: receivers[2]._id, bg: 'O+' },
      { receiver: receivers[3]._id, bg: 'B+' },
      { receiver: receivers[3]._id, bg: 'AB+' },
      { receiver: receivers[3]._id, bg: 'A-' },
      { receiver: receivers[4]._id, bg: 'AB-' },
      { receiver: receivers[4]._id, bg: 'A-' },
      { receiver: receivers[4]._id, bg: 'O-' },
    ]);

    // 5. Seed Initial Sample Requests
    await BloodRequest.create([
      { hospital: hospitals[0]._id, receiver: receivers[1]._id, bg: 'A-', status: 'Pending' },
      { hospital: hospitals[0]._id, receiver: receivers[2]._id, bg: 'O+', status: 'Accepted' },
      { hospital: hospitals[1]._id, receiver: receivers[0]._id, bg: 'A+', status: 'Pending' },
    ]);

    await BloodDonate.create([
      { hospital: hospitals[0]._id, receiver: receivers[1]._id, bg: 'B+', status: 'Pending' },
      { hospital: hospitals[2]._id, receiver: receivers[0]._id, bg: 'A+', status: 'Accepted' },
      { hospital: hospitals[1]._id, receiver: receivers[4]._id, bg: 'AB-', status: 'Pending' },
    ]);

    console.log('✅ Seed completed successfully!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  }
};

// If run standalone via `npm run seed`
if (process.argv[1]?.endsWith('seedData.js')) {
  (async () => {
    await connectDB();
    await seedDatabase();
    process.exit(0);
  })();
}

