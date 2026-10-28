require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Appointment = require('./models/Appointment');
const Offer = require('./models/Offer');
const Review = require('./models/Review');
const Blog = require('./models/Blog');
const Admin = require('./models/Admin');
const {
  seedProducts,
  seedAppointments,
  seedOffers,
  seedReviews,
  seedBlogs,
  seedAdmin,
} = require('./data/seedData');

const runSeed = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/eyelitz_optical';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 4000 });
    console.log('Connected to MongoDB successfully. Seeding data...');

    // Clear existing
    await Promise.all([
      Product.deleteMany({}),
      Appointment.deleteMany({}),
      Offer.deleteMany({}),
      Review.deleteMany({}),
      Blog.deleteMany({}),
      Admin.deleteMany({}),
    ]);

    // Insert seeds
    await Product.insertMany(seedProducts);
    await Appointment.insertMany(seedAppointments);
    await Offer.insertMany(seedOffers);
    await Review.insertMany(seedReviews);
    await Blog.insertMany(seedBlogs);

    // Create Admin
    const admin = new Admin(seedAdmin);
    await admin.save();

    console.log('✨ Database seeding complete!');
    console.log(`- ${seedProducts.length} Products seeded`);
    console.log(`- ${seedAppointments.length} Appointments seeded`);
    console.log(`- ${seedOffers.length} Offers seeded`);
    console.log(`- ${seedReviews.length} Reviews seeded`);
    console.log(`- ${seedBlogs.length} Blogs seeded`);
    console.log(`- Default Admin user created: username: "${seedAdmin.username}", password: "${seedAdmin.password}"`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error.message);
    process.exit(1);
  }
};

runSeed();
